import { InlineStack, Button, Text } from '@shopify/polaris'
import { ArrowLeftMinor } from "@shopify/polaris-icons";

const Navigation = () => {
  return (
    <InlineStack
            wrap={false}
            gap={{ xs: "200", sm: "300", md: "400", lg: "500", xl: "600" }}
            blockAlign="center"
          >
            <Button size="large" icon={ArrowLeftMinor} />
            <Text as="h5" variant="headingLg">
              Create Volume Discount
            </Text>
          </InlineStack>
  )
}

export default Navigation