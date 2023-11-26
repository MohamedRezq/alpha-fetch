import moment from "moment";

const integrate_atlassian = new Map([
  [
    "billing",
    {
      customEndpoint: "/licenses/admin/multiple",
      mapRequestBody: (item: any) => ({
        id_source: item.ccpEntitlementId,
        source: "self",
        // organization_id: req.user.organization_id,
        seller: "atlassian",
        application_name: item.productName,
        application_slug: item.slug,
        department_id: 0 /* Assign appropriate department_id */,
        billing_cycle:
          item.chargeQuantity.chargeElement === "unit" ? "monthly" : "yearly",
        issue_date:
          item.billing_cycle === "monthly"
            ? moment(item.nextBillDate).subtract(1, "months").toDate()
            : moment(item.nextBillDate).subtract(1, "years").toDate(),
        total_licenses_count: item.chargeQuantity.quantity,
        used_licenses_count: item.chargeQuantity.quantity,
        inactive_licenses_count: 0,
        total_amount_paid: item.priceEstimate,
        per_user_amount_paid: item.priceEstimate / item.chargeQuantity.quantity,
        total_wastage_amount: 0,
        data: JSON.stringify(item),
      }),
    },
  ],
]);

export default integrate_atlassian;
