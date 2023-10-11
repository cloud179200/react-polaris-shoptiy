import {
  FormLayout,
  TextField,
  TextFieldProps,
  Text,
  Card,
  BlockStack,
  Button,
  SelectProps,
  Divider,
  Select,
  Box,
  InlineStack,
} from "@shopify/polaris";
import { useEffect, useMemo } from "react";
import { FormikErrors, FormikTouched, useFormik } from "formik";
import _ from "lodash";
import { formValuesSchema } from "./schema";
import { CirclePlusMajor, DeleteMajor } from '@shopify/polaris-icons';
import { DISCOUNT_TYPE } from "./constant";
import { usePrevious } from "react-use";
import React from "react";

export interface IVolumeDiscountRule {
  title: string;
  subTitle: string;
  label: string;
  quantity: number;
  type: "none" | "percent" | "discount_each";
  amount: null | number;
}

export interface IFormValues {
  campaign: string;
  title: string;
  description: string;
  volumeDiscountRules: Array<IVolumeDiscountRule>;
}

const useFormControl = () => {

  const defaultVolumeDiscountRule: IVolumeDiscountRule = useMemo(() => ({
    title: '',
    subTitle: '',
    label: '',
    quantity: 0,
    type: "none",
    amount: 0
  }), [])

  const defaultValues: IFormValues = useMemo(
    () => ({
      campaign: "",
      title: "",
      description: "",
      volumeDiscountRules: [_.cloneDeep(defaultVolumeDiscountRule)],
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const formik = useFormik<IFormValues>({
    initialValues: _.cloneDeep(defaultValues),
    validationSchema: formValuesSchema,
    onSubmit: (values) => {
      debugger
    },
    validateOnChange: true
  });

  const { values, setValues, errors, touched, handleBlur, setTouched, setFieldValue } = formik;
  const prevValues = usePrevious(values);

  const handleChange = (value: string, id: string) => {
    setFieldValue(id, value, true)
  };

  const handleAddVolumeDiscountRule = () => {
    const newRules = values.volumeDiscountRules
    newRules.push(_.cloneDeep(defaultVolumeDiscountRule))
    setFieldValue("volumeDiscountRules", newRules)
  }

  const handleRemoveVolumeDiscountRule = (index: number) => {
    const rules = _.cloneDeep(values.volumeDiscountRules || [])
    setFieldValue("volumeDiscountRules", rules.slice(0, index).concat(rules.slice(index + 1)))
  }

  return {
    values,
    prevValues,
    setValues,
    errors,
    touched,
    setTouched,
    handleChange,
    handleBlur,
    handleAddVolumeDiscountRule,
    handleRemoveVolumeDiscountRule
  };
};

interface IFormProps {
  setListPreview: (items: Array<IVolumeDiscountRule>) => void
}

const Form = (props: IFormProps) => {
  const { setListPreview } = props
  const { values, prevValues, errors, touched, handleChange, handleBlur, handleAddVolumeDiscountRule, handleRemoveVolumeDiscountRule } = useFormControl();

  const generalTextFieldsProps: Array<TextFieldProps> = [
    {
      label: "Campaign",
      placeholder: "Volume discount #2",
      autoComplete: "off",
      id: "campaign",
      value: values.campaign,
      onChange: handleChange,
      error: (errors.campaign && touched.campaign) ? errors.campaign : undefined,
      onBlur: handleBlur
    },
    {
      label: "Title",
      placeholder: "Buy more and save",
      autoComplete: "off",
      id: "title",
      value: values.title,
      onChange: handleChange,
      error: (errors.title && touched.title) ? errors.title : undefined,
      onBlur: handleBlur
    },
    {
      label: "Description",
      placeholder: "Apply for more products in store",
      autoComplete: "off",
      id: "description",
      value: values.description,
      onChange: handleChange,
      error: (errors.description && touched.description) ? errors.description : undefined,
      onBlur: handleBlur
    },
  ];

  const volumeDiscountRuleFieldsProps = values.volumeDiscountRules.map((item, index) => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const rulesErrors = (errors.volumeDiscountRules || []) as Array<FormikErrors<IVolumeDiscountRule>>;
    const rulesTouched = (touched.volumeDiscountRules || []) as Array<FormikTouched<IVolumeDiscountRule>>;
    const textFieldsProps: Array<TextFieldProps> = [
      {
        label: "Title",
        autoComplete: "off",
        id: `volumeDiscountRules[${index}].title`,
        value: item.title,
        onChange: handleChange,
        error: Boolean(rulesErrors.at(index)?.title && rulesTouched.at(index)?.title) ? rulesErrors.at(index)?.title : "",
        onBlur: handleBlur
      },
      {
        label: "Subtitle",
        autoComplete: "off",
        id: `volumeDiscountRules[${index}].subTitle`,
        value: item.subTitle,
        onChange: handleChange,
        error: Boolean(rulesErrors.at(index)?.subTitle && rulesTouched.at(index)?.subTitle) ? rulesErrors.at(index)?.subTitle : "",
        onBlur: handleBlur
      },
      {
        label: "Label (optional)",
        autoComplete: "off",
        id: `volumeDiscountRules[${index}].label`,
        value: item.label,
        onChange: handleChange,
        error: Boolean(rulesErrors.at(index)?.label && rulesTouched.at(index)?.label) ? rulesErrors.at(index)?.label : "",
        onBlur: handleBlur,
      },
      {
        label: "Quantity",
        autoComplete: "off",
        id: `volumeDiscountRules[${index}].quantity`,
        value: item.quantity.toString(),
        onChange: handleChange,
        error: Boolean(rulesErrors.at(index)?.quantity && rulesTouched.at(index)?.quantity) ? rulesErrors.at(index)?.quantity : "",
        onBlur: handleBlur,
        type: "integer"
      }
    ];

    const discountTypeOptions = _.cloneDeep(Object.values(DISCOUNT_TYPE))

    const discountTypeProps: {
      selectProps: SelectProps,
      amountProps: TextFieldProps
    } = {
      selectProps: {
        id: `volumeDiscountRules[${index}].type`,
        value: item.type,
        label: "Discount Type",
        error: Boolean(rulesErrors.at(index)?.type && rulesTouched.at(index)?.type) ? rulesErrors.at(index)?.type : "",
        options: discountTypeOptions,
        onChange: handleChange,
        onBlur: () => handleBlur(`volumeDiscountRules[${index}].type`)
      },
      amountProps: {
        label: "Amount",
        autoComplete: "off",
        id: `volumeDiscountRules[${index}].amount`,
        value: Number(item.amount).toString(),
        onChange: handleChange,
        error: Boolean(rulesErrors.at(index)?.amount && rulesTouched.at(index)?.amount) ? rulesErrors.at(index)?.amount : "",
        onBlur: handleBlur,
      }
    }
    return {
      textFieldsProps,
      discountTypeProps
    }
  })

  const generalTextFieldsRender = generalTextFieldsProps.map((props, index) => (
    <TextField key={props.id + `_field_general_${index}`} {...props} />
  ))

  const volumeDiscountRuleRender = volumeDiscountRuleFieldsProps.map((item, index) => {
    const textFieldRender = item.textFieldsProps.map((props, childIndex) => (<TextField key={props.id + `_filed_volume_container_${index}_${childIndex}`} {...props} />));
    return <div key={`_volume_container_${index}`} className="volume_container">
      <span className="volume_container_label"><Text as="h6" variant="headingMd">OPTION {index}</Text></span>
        <Box paddingBlockStart={"600"} paddingInlineEnd={"400"} paddingInlineStart={"400"}>
          <Box width="100%" padding={"200"}>
            <InlineStack align="end"> <Button variant="tertiary" size="large" icon={DeleteMajor} onClick={() => handleRemoveVolumeDiscountRule(index)} /></InlineStack>
          </Box>
          <Box width="100%" paddingBlockEnd={"400"}>
            <FormLayout>
              <FormLayout.Group condensed>
                {textFieldRender}
                <Select {...item.discountTypeProps.selectProps} />
                {item.discountTypeProps.selectProps.value !== DISCOUNT_TYPE.NONE.value &&
                  <TextField {...item.discountTypeProps.amountProps} suffix={Object.values(DISCOUNT_TYPE).find(type => type.value === item.discountTypeProps.selectProps.value)?.suffix || ""} />}
              </FormLayout.Group>
            </FormLayout>
          </Box>
        </Box>
        <Divider borderColor="border" borderWidth="050" />
      </div>
  })

  useEffect(() => {
    setListPreview(values.volumeDiscountRules || [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_.isEqual(values, prevValues)])

  return (
    <>
      <BlockStack gap={"400"}>
        <Card padding={"0"}>
          <Box padding={"400"} paddingBlockEnd={"600"}>
            <Text as="h5" variant="headingLg">
              General
            </Text>
          </Box>
          <Box paddingBlockEnd={"400"} paddingInlineEnd={"400"} paddingInlineStart={"400"}>
            <FormLayout>
              {generalTextFieldsRender}
            </FormLayout>
          </Box>
        </Card>
        <Card padding={"0"}>
          <Box padding={"400"}>
            <Text as="h5" variant="headingLg">
              Volume Discount Rules
            </Text>
          </Box>
          <Divider borderColor="border" borderWidth="050" />
          {volumeDiscountRuleRender}
          <Divider borderColor="border" borderWidth="050" />
          <Box paddingBlockEnd={"400"} paddingBlockStart={"400"} paddingInlineStart={"800"} paddingInlineEnd={"800"}>
            <Button fullWidth variant="primary" tone="critical" size="large" icon={CirclePlusMajor} onClick={handleAddVolumeDiscountRule}>
              Add option
            </Button>
          </Box>
        </Card>
      </BlockStack>
    </>
  );
}

export default Form