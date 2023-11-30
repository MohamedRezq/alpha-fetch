const integrate_salesforce = new Map([
  // [
  //   "employees",
  //   {
  //     customEndpoint: "/employees/admin/multiple",
  //     mapRequestBody: (item: any) => ({
  //       id_source: null, // Provide the appropriate value
  //       organization_id: item.organization_id, // Use the organization_id from the payload
  //       organization_application_id: item.organization_application_id, // Use the organization_application_id from the payload
  //       department_id: 0, // Provide the appropriate value
  //       first_name: item.Full_name.split(", ")[1], // Assuming Full_name format is "Last, First"
  //       last_name: item.Full_name.split(", ")[0],
  //       avatar_url: "", // You can set a default value or leave it empty
  //       email_address: item.Username,
  //       mobile: "", // You can set a default value or leave it empty
  //       role: item.Role,
  //       status: item.Active ? "active" : "inactive",
  //       data: JSON.stringify(item), // Store the original JSON data if needed
  //       created_at: new Date(),
  //       updated_at: new Date(),
  //       deleted_at: null, // Assuming the record is not deleted initially
  //     }),
  //   },
  // ],
  [
    "invoices",
    {
      customEndpoint: "/licenses/admin/multiple",
      mapRequestBody: (item: any) => {
        // Extracting data from the provided JSON
        const {
          PRODUCT,
          "START DATE": START_DATE,
          "END DATE": END_DATE,
          QUANTITY,
          "TOTAL AMOUNT": TOTAL_AMOUNT,
        } = item;

        // Calculate billing cycle based on the difference between END DATE & START DATE
        const startDate = new Date(START_DATE);
        const endDate = new Date(END_DATE);
        const billingCycle =
          endDate.getMonth() === startDate.getMonth() ? "monthly" : "yearly";

        // Create the licenses model data
        const licensesData = {
          source: "self", // Assuming it comes from the self source
          id_source: null, // Provide the appropriate value
          organization_id: item.organization_id, // Use the organization_id from the payload
          organization_application_id: item.organization_application_id, // Use the organization_application_id from the payload
          seller: "salesforce", // You can set a default value or leave it empty
          // application_name: PRODUCT,
          // application_slug: PRODUCT.toLowerCase().replace(/ /g, "-"), // Convert to slug format
          currency: "USD",
          is_paid: true,
          department_id: 0, // Provide the appropriate value
          billing_cycle: billingCycle,
          issue_date: new Date(START_DATE),
          total_licenses_count: parseInt(QUANTITY),
          used_licenses_count: parseInt(QUANTITY), // Assuming total licenses count is initially used
          inactive_licenses_count: 0, // You can set a default value or leave it empty
          total_amount_paid: parseFloat(TOTAL_AMOUNT),
          per_user_amount_paid: parseFloat(TOTAL_AMOUNT) / parseInt(QUANTITY),
          total_wastage_amount: 0, // You can set a default value or leave it empty
          data: JSON.stringify(item), // Store the original JSON data if needed
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null, // Assuming the record is not deleted initially
        };

        return licensesData;
      },
    },
  ],
  [
    "billing",
    {
      customEndpoint: "/licenses/admin/multiple",
      mapRequestBody: (item: any) => {
        // Extracting data from the provided JSON
        const {
          Name,
          Status: status,
          "Total Licenses": totalLicenses,
          "Used Licenses": usedLicenses,
          "Remaining Licenses": remainingLicenses,
          "Expiration Date": expirationDate,
        } = item;

        // Assuming organization_id and organization_application_id are available
        const organization_id = item.organization_id;
        const organization_application_id = item.organization_application_id;

        // Create the licenses model data
        const licensesData = {
          source: "self", // Assuming it comes from the self source
          id_source: null, // Provide the appropriate value
          organization_id: organization_id,
          organization_application_id: organization_application_id,
          seller: "salesforce", // You can set a default value or leave it empty
          application_name: Name,
          application_slug: Name.toLowerCase().replace(/ /g, "-"), // Convert to slug format
          currency: "USD",
          is_paid: status === "Active",
          department_id: 0, // Provide the appropriate value
          billing_cycle: "monthly", // Assuming billing cycle is monthly
          issue_date: new Date(),
          total_licenses_count: parseInt(totalLicenses.replace(/,/g, ""), 10),
          used_licenses_count: parseInt(usedLicenses.replace(/,/g, ""), 10),
          inactive_licenses_count: parseInt(
            remainingLicenses.replace(/,/g, ""),
            10
          ),
          total_amount_paid: 0, // Placeholder, set to appropriate value
          per_user_amount_paid: 0, // Placeholder, set to appropriate value
          total_wastage_amount: 0, // You can set a default value or leave it empty
          data: JSON.stringify(item), // Store the original JSON data if needed
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null, // Assuming the record is not deleted initially
        };

        return licensesData;
      },
    },
  ],
]);

export default integrate_salesforce as Map<
  string,
  { customEndpoint: string; mapRequestBody: any }
>;
