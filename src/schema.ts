import * as yup from "yup";

const INVALID_CAMPAIGN_NAME_MESSAGE = "Campaign name is required.";
const INVALID_CAMPAIGN_TITLE_MESSAGE = "Campaign title is required.";
const INVALID_CAMPAIGN_DESCRIPTION_MESSAGE = "Campaign description is required.";
const INVALID_VOLUME_DISCOUNT_RULE_TITLE_MESSAGE = "Volume discount rule title is required.";
const INVALID_VOLUME_DISCOUNT_RULE_SUBTITLE_MESSAGE = "Volume discount rule subtitle is required.";
const INVALID_VOLUME_DISCOUNT_RULE_LABEL_MESSAGE = "Volume discount rule label is required.";
const INVALID_VOLUME_DISCOUNT_RULE_QUANTITY_MESSAGE = "Volume discount rule quantity is required.";
const INVALID_VOLUME_DISCOUNT_RULE_TYPE_MESSAGE = "Volume discount rule type is required.";
const INVALID_VOLUME_DISCOUNT_RULE_AMOUNT_MESSAGE = "Volume discount rule amount is required.";

export const volumeDiscountRuleSchema = yup.object().shape({
  title: yup.string().required(INVALID_VOLUME_DISCOUNT_RULE_TITLE_MESSAGE),
  subTitle: yup.string().required(INVALID_VOLUME_DISCOUNT_RULE_SUBTITLE_MESSAGE),
  label: yup.string().required(INVALID_VOLUME_DISCOUNT_RULE_LABEL_MESSAGE),
  quantity: yup.number().required(INVALID_VOLUME_DISCOUNT_RULE_QUANTITY_MESSAGE),
  type: yup.string()
    .oneOf(["none", "percent"])
    .required(INVALID_VOLUME_DISCOUNT_RULE_TYPE_MESSAGE),
  amount: yup.number().when("type", (type, schema) => {
    if (type[0] === "percent")
      return schema.min(0).required(INVALID_VOLUME_DISCOUNT_RULE_AMOUNT_MESSAGE);
    return schema.optional();
  }),
});

export const formValuesSchema = yup.object().shape({
  campaign: yup.string().required(INVALID_CAMPAIGN_NAME_MESSAGE),
  title: yup.string().required(INVALID_CAMPAIGN_TITLE_MESSAGE),
  description: yup.string().required(INVALID_CAMPAIGN_DESCRIPTION_MESSAGE),
  volumeDiscountRules: yup.array(volumeDiscountRuleSchema),
});