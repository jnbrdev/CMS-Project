import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CToastBody,
  CButton,
  CContainer,
  CTable,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const columns = [
  {
    key: 'id',
    label: '#',
    _props: { scope: 'col' },
  },
  {
    key: 'invoice_no',
    label: 'Invoice #',
    _props: { scope: 'col' },
  },
  {
    key: 'unit_no',
    label: 'Unit #',
    _props: { scope: 'col' },
  },
  {
    key: 'billpayer',
    label: 'Billpayer',
    _props: { scope: 'col' },
  },
  {
    key: 'billing_cost',
    label: 'Billing Cost',
    _props: { scope: 'col' },
  },
  {
    key: 'current_reading',
    label: 'Current Reading',
    _props: { scope: 'col' },
  },
  {
    key: 'previous_reading',
    label: 'Previous Reading',
    _props: { scope: 'col' },
  },
  {
    key: 'reading_date',
    label: 'Reading Date',
    _props: { scope: 'col' },
  },
  {
    key: 'due_date',
    label: 'Due Date',
    _props: { scope: 'col' },
  },
  {
    key: 'actions',
    label: 'Actions',
    _props: { scope: 'col' },
  },
]
const items = [
  {
    id: 1,
    class: 'Mark',
    invoice_no: 'Otto',
    unit_no: '@mdo',
    billpayer: '@mdo',
    billing_cost: '@mdo',
    actions: <CButton href="/billings/waterbilllist">Edit</CButton>,
    _cellProps: { id: { scope: 'row' } },
  },
  {
    id: 2,
    class: 'Jacob',
    heading_1: 'Thornton',
    heading_2: '@fat',

    _cellProps: { id: { scope: 'row' } },
  },
  {
    id: 3,
    class: 'Larry the Bird',
    heading_2: '@twitter',
    _cellProps: { id: { scope: 'row' }, class: { colSpan: 2 } },
  },
]

const AddBilling = () => {
  return (
    <CContainer>
      <CRow>
        <CTable
          bordered
          className="user-list-table"
          color="light"
          columns={columns}
          items={items}
          tableHeadProps={{ color: 'dark' }}
        />
      </CRow>
    </CContainer>
  )
}

export default AddBilling
