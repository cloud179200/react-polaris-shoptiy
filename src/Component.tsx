import { Grid, InlineStack, Button, Text } from "@shopify/polaris";
import { ArrowLeftMinor } from "@shopify/polaris-icons";
import Form from "./Form";


function Component() {
  return (
    <div style={{
      width: "100%",
      maxWidth: "100vh",
      marginLeft: "calc((100% - 768px)/2)",
      marginRight: "calc((100% - 768px)/2)"
    }}>
      <Grid columns={{ xs: 6, md: 6, lg: 6, xl: 6 }}>
        <Grid.Cell columnSpan={{ xs: 6, md: 6, lg: 6, xl: 6 }}>
          <InlineStack
            wrap={false}
            gap={{ xs: "200", sm: "300", md: "400", lg: "500", xl: "600" }}
            blockAlign="center"
          >
            <Button size="large" icon={ArrowLeftMinor} />
            <Text variant="headingXl" as="h4">
              Create Volume Discount
            </Text>
          </InlineStack>
        </Grid.Cell>
        <Grid.Cell columnSpan={{ xs: 6, md: 6, lg: 6, xl: 6 }}>
          <Form />
        </Grid.Cell>
      </Grid>
    </div>
  );
}

export default Component;
