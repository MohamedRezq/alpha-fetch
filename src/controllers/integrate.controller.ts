import { Response } from "express";
import axios from "axios";
import SyncLog from "../models/SyncLog";
import { MS_ALPHA_INSIGHTS_BASEURL } from "../config/dependencies";
import OrganizationApplication from "../models/OrganizationApplication";
import { IAuthRequest } from "../utils/interfaces";
import integrationConfig from "../config/integration";
import Application from "../models/Application";

export const integrateData = async (
  req: IAuthRequest,
  res: Response
): Promise<void> => {
  try {
    // Extracting query parameters
    const { src, slug } = req.query;
    const seller = req.query?.seller as string;
    const data_type = req.query?.data_type as string;

    // Step 1: Get ApplicationID by Slug
    const applicationResponse = await Application.findOne({
      where: { slug: slug },
    });

    // Step 2: Get the response as an application object and save its id in a constant called application_id
    const application_id = applicationResponse?.id;

    // Step 3: Search organization_applications table for a record
    // with organization_id equal to the organization_id parameter value retrieved from the token
    // and application_id equal to the one we just saved in the const
    const organization_application = await OrganizationApplication.findOne({
      where: {
        organization_id: req.user?.organization_id, // Assuming organization_id is stored in the user token
        application_id: application_id,
      },
    });

    // If found record, get the id from it and save it in const called organization_application_id
    const organization_application_id = organization_application
      ? organization_application.id
      : null;

    // Step 4: Create SyncLog
    const syncLog = await SyncLog.create({
      organization_application_id: organization_application_id,
      source: src,
      type: data_type,
      data: JSON.stringify(req.body),
    });

    // Step 5: Customize MS_ALPHA_INSIGHTS_BASEURL/{{custom-endpoint}} and request body
    let customEndpoint = "";
    let mapRequestBody = null;

    // Check if the seller and data_type exist in the configuration
    const integrationInterface = integrationConfig?.get(seller)?.get(data_type);
    if (integrationInterface) {
      customEndpoint = integrationInterface.customEndpoint;
      mapRequestBody = integrationInterface.mapRequestBody;
    } else {
      // Handle case where the combination of seller and data_type is not configured
      res
        .status(400)
        .json({ message: "Invalid combination of seller and data_type" });
    }

    // Send request to the customized endpoint
    const requestBody = mapRequestBody
      ? req.body.map(mapRequestBody)
      : req.body;

    // Send request to the customized endpoint
    const insightsResponse = await axios.post(
      `${MS_ALPHA_INSIGHTS_BASEURL}${customEndpoint}`,
      requestBody
    );

    // Handle the insightsResponse as needed

    // Send a response to the client
    if (insightsResponse.status == 200) {
      res.status(200).json({ message: "Integration successful" });
    } else {
      res.status(500).send("Remote AlphaInshight Server Error");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
