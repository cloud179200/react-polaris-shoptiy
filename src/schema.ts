import * as yup from "yup";

const INVALID_REQUIRED_MESSAGE = "This field is required.";
const INVALID_MIN_MESSAGE = "This value must be at least ";
const INVALID_TYPE_MESSAGE = "This value must be of type ";


export const volumeDiscountRuleSchema = yup.object().shape({
  title: yup.string().required(INVALID_REQUIRED_MESSAGE).typeError(INVALID_TYPE_MESSAGE + "string."),
  subTitle: yup.string().required(INVALID_REQUIRED_MESSAGE).typeError(INVALID_TYPE_MESSAGE + "string."),
  label: yup.string().typeError(INVALID_TYPE_MESSAGE + "string."),
  quantity: yup.number().min(0, INVALID_MIN_MESSAGE + "0.").required(INVALID_REQUIRED_MESSAGE).typeError("number"),
  type: yup.string()
    .oneOf(["none", "percent", "discount_each"])
    .required(INVALID_REQUIRED_MESSAGE)
    .typeError(INVALID_TYPE_MESSAGE + "string."),
  amount: yup.number().when("type", (type, schema) => {
    if (type[0] === "percent") {
      return schema.min(0, INVALID_MIN_MESSAGE + "0.").required(INVALID_REQUIRED_MESSAGE).typeError("number");
    }
    return schema.optional();
  }),
});

export const formValuesSchema = yup.object().shape({
  campaign: yup.string().required(INVALID_REQUIRED_MESSAGE).typeError(INVALID_TYPE_MESSAGE + "string."),
  title: yup.string().required(INVALID_REQUIRED_MESSAGE).typeError(INVALID_TYPE_MESSAGE + "string."),
  description: yup.string().required(INVALID_REQUIRED_MESSAGE).typeError(INVALID_TYPE_MESSAGE + "string."),
  volumeDiscountRules: yup.array(volumeDiscountRuleSchema),
});
