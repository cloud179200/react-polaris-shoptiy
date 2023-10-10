import { Button, FormLayout, Grid, TextField, TextFieldProps, Text, InlineStack, Card, Box } from '@shopify/polaris'
import { useState } from 'react'
import {
  ArrowLeftMinor
} from '@shopify/polaris-icons';

const useFormControl = () => {
  const [values, setValues] = useState({
    campaign: "",
    title: "",
    description: ""
  })
  const handleChange = (value: string, id: string) => {
    setValues({ ...values, [id]: value })
  }
  return {
    values,
    setValues,
    handleChange
  }
}

function Form() {

  const { values, setValues, handleChange } = useFormControl();
  const textFieldProps: Array<TextFieldProps> = [{
    label: "Campaign",
    placeholder: "Volume discount #2",
    autoComplete: "off",
    id: "campaign",
    value: values.campaign,
    onChange: handleChange
  },
  {
    label: "Title",
    placeholder: "Buy more and save",
    autoComplete: "off",
    id: "title",
    value: values.title,
    onChange: handleChange
  },
  {
    label: "Description",
    placeholder: "Apply for more products in store",
    autoComplete: "off",
    id: "description",
    value: values.description,
    onChange: handleChange
  }]

  return (
    <Card padding={"400"}>
      <Text as="h2" variant="headingMd">
        General
      </Text>
      <FormLayout>
        {textFieldProps.map(prop => <TextField {...prop} />)}
      </FormLayout>
    </Card>)
}


function Component() {
  return (
    <Box width='100vh'>
      <Grid columns={{ xs: 6, md: 6, xl: 6 }}>
        <Grid.Cell columnSpan={{ xs: 6, md: 6, xl: 12 }}>
          <InlineStack wrap={false} gap={{ xs: '200', sm: '300', md: '400', lg: '500', xl: '600' }} blockAlign='center'>
            <Button size='large' icon={ArrowLeftMinor} />
            <Text variant="headingXl" as="h4">
              Create Volume Discount
            </Text>
          </InlineStack>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, md: 4, xl: 8 }}>
          <Form />
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, md: 4, xl: 8 }}>
          <Form />
        </Grid.Cell>
      </Grid>
    </Box>
  )
}

export default Component