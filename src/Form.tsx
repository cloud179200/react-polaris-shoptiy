import {
  FormLayout,
  TextField,
  TextFieldProps,
  Text,
  Card,
  BlockStack,
} from "@shopify/polaris";
import { useMemo } from "react";
import { useFormik } from "formik";
import _ from "lodash";
import { formValuesSchema } from "./schema";

interface IVolumeDiscountRule {
  title: string;
  subTitle: string;
  label: string;
  quantity: number;
  type: "none" | "percent";
  amount: null | number;
}

interface IFormValues {
  campaign: string;
  title: string;
  description: string;
  volumeDiscountRules: Array<IVolumeDiscountRule>;
}

const useFormControl = () => {
  const defaultValues: IFormValues = useMemo(
    () => ({
      campaign: "",
      title: "",
      description: "",
      volumeDiscountRules: [],
    }),
    []
  );

  const formik = useFormik<IFormValues>({
    initialValues: _.cloneDeep(defaultValues),
    validationSchema: formValuesSchema,
    onSubmit: (values) => {
      debugger
    },
  });

  const { values, setValues, errors, touched, handleBlur, setFieldValue } = formik;

  const handleChange = (value: string, id: string) => {
    setFieldValue(id, value)
  };

  return {
    values,
    setValues,
    errors,
    touched,
    handleChange,
    handleBlur
  };
};

function Form() {
  const { values, errors, touched, handleChange, handleBlur } = useFormControl();

  const generalTextFieldProps: Array<TextFieldProps> = [
    {
      label: "Campaign",
      placeholder: "Volume discount #2",
      autoComplete: "off",
      id: "campaign",
      value: values.campaign,
      onChange: handleChange,
      error: errors.campaign && touched.campaign,
      onBlur: handleBlur,
      helpText: (errors.campaign && touched.campaign) ? errors.campaign : undefined
    },
    {
      label: "Title",
      placeholder: "Buy more and save",
      autoComplete: "off",
      id: "title",
      value: values.title,
      onChange: handleChange,
      error: errors.title && touched.title,
      onBlur: handleBlur,
      helpText: (errors.title && touched.title) ? errors.title : undefined
    },
    {
      label: "Description",
      placeholder: "Apply for more products in store",
      autoComplete: "off",
      id: "description",
      value: values.description,
      onChange: handleChange,
      error: errors.description && touched.description,
      onBlur: handleBlur,
      helpText: (errors.description && touched.description) ? errors.description : undefined
    },
  ];

  const listVolumeDiscountRuleTextFieldProp = values.volumeDiscountRules.map((item, index) => {
    const props: Array<TextFieldProps> = [
      {
        label: "Title",
        autoComplete: "off",
        id: `volumeDiscountRules[${index}].title`,
        value: item.title,
        onChange: handleChange,
        // error: errors.volumeDiscountRules[index] && touched.campaign,
        // onBlur: handleBlur,
        // helpText: (errors.campaign && touched.campaign) ? errors.campaign : undefined
      }
    ];

    return props
  })

  return (
    <>
      <BlockStack gap={"400"}>
        <Card padding={"400"}>
          <Text as="h2" variant="headingMd">
            General
          </Text>
          <FormLayout>
            {generalTextFieldProps.map((prop) => (
              <TextField key={prop.id+"_field"} {...prop} />
            ))}
          </FormLayout>
        </Card>
        <Card padding={"400"}>
          <Text as="h2" variant="headingMd">
            Volume Discount Rules
          </Text>
          <FormLayout>
            {generalTextFieldProps.map((prop) => (
              <TextField {...prop} />
            ))}
          </FormLayout>
        </Card>
      </BlockStack>
    </>
  );
}

export default Form