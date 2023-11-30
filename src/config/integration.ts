import integrate_atlassian from "./integrations/atlassian";
import integrate_salesforce from "./integrations/salesforce";

const integrationConfig = new Map([
  ["atlassian", integrate_atlassian],
  ["salesforce", integrate_salesforce],
]);

export default integrationConfig;
