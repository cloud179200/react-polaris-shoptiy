import { useMemo } from 'react';
import { IVolumeDiscountRule } from './Form';
import { Card, Box, Text, DataTable, ColumnContentType } from '@shopify/polaris';
import { DISCOUNT_TYPE } from './constant';

const useDataTableControl = (listData: Array<IVolumeDiscountRule>) => {
  const columnContentTypes: Array<ColumnContentType> = useMemo(() => ['text',
    'text',
    'text',
    'numeric',
    'text'], [])
  const headings: Array<React.ReactNode> = useMemo(() => [
    'Title',
    'Discount Type',
    'Quantity',
    'Amount',
  ], [])
  const dataMapped = listData.map(item => ([item.title,
  Object.values(DISCOUNT_TYPE).find(type => type.value === item.type)?.label || "",
  item.quantity,
  item.type !== DISCOUNT_TYPE.NONE.value ?
    item.amount + (Object.values(DISCOUNT_TYPE).find(type => type.value === item.type)?.suffix || "")
    : null]))
  return {
    columnContentTypes,
    headings,
    rows: dataMapped
  }

}

interface IPreviewProps {
  listPreview: Array<IVolumeDiscountRule>;
}

const Preview = (props: IPreviewProps) => {
  const { listPreview } = props;
  const { columnContentTypes, headings, rows } = useDataTableControl(listPreview)

  return (
    <Card padding={"0"}>
      <Box padding={"400"} paddingBlockEnd={"600"}>
        <Text as="h5" variant="headingLg">
          Preview
        </Text>
      </Box>
      <Box padding={"400"} paddingBlockStart={"0"}>
        <Text as="h6" variant="headingMd" alignment='center'>
          Buy more and save
        </Text>
        <Text as={'p'} >
          Apply for all products in store
        </Text>
      </Box>
      {Boolean(rows.length) && <Box padding={"400"} paddingBlockStart={"0"}>
        <DataTable
          columnContentTypes={columnContentTypes}
          headings={headings}
          rows={rows}
        /> </Box>}
    </Card>
  )
}

export default Preview