import { Page, Layout } from "@shopify/polaris";
import Form, { IVolumeDiscountRule } from "./Form";
import { useState } from "react";
import Preview from "./Preview";
import Navigation from "./Navigation";


const Component = () => {
  const [listPreview, setListPreview] = useState<Array<IVolumeDiscountRule>>([])

  return (
    <Page fullWidth>
      <div className="form-layout-wrapper">
        <Layout>
          <Layout.Section variant="fullWidth">
            <Navigation />
          </Layout.Section>
          <Layout.Section>
            <Form setListPreview={setListPreview} />
          </Layout.Section>
          <Layout.Section variant="oneThird">
            <Preview listPreview={listPreview} />
          </Layout.Section>
        </Layout>
      </div>
    </Page >
  );
}

export default Component;
