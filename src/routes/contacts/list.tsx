import React from "react";
import { IResourceComponentsProps, BaseRecord, HttpError } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  TextField,
  CreateButton,
} from "@refinedev/antd";
import { Table, Space, Avatar, Form, Input, Tag } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { ContactsListQuery } from "@/graphql/types";
import { CONTACTS_LIST_QUERY } from "./queries";

type Props = React.PropsWithChildren;


export const ContactList: React.FC<Props> = () => {
  const { tableProps, searchFormProps } = useTable<
  GetFieldsFromList<ContactsListQuery>,
  HttpError,
  { name: string }
>({
    meta: {gqlQuery: CONTACTS_LIST_QUERY},
    sorters: {
      initial: [
        {
          field: "id",  
          order: "desc"
        }
      ]
    },
    onSearch: (params: { name: string }) => [
      {
        field: "name",
        operator: "contains",
        value: params.name
      }
    ]
  });

  return (
    <List
      headerButtons={() => (
        <>
          <Form
            {...searchFormProps}
            onValuesChange={() => {
              searchFormProps.form?.submit();
            }}
          >
            <Form.Item noStyle name="name">
              <Input.Search placeholder="Search by name" />
            </Form.Item>
          </Form>
        </>
      )}
      title={
        <CreateButton icon={<PlusCircleOutlined />}>
          Add new contact
        </CreateButton>
      }
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column
          title="Name"
          width={200}
          render={(_, record: { name: string; avatarUrl: string }) => (
            <Space>
              <Avatar src={record.avatarUrl} alt={record.name} />
              <TextField value={record.name} />
            </Space>
          )}
        />
        <Table.Column
          dataIndex={["email"]}
          title="Email"
          //   render={(value) => <EmailField value={value} />}
        />
        <Table.Column dataIndex={["company", "name"]} title="Company" />
        <Table.Column dataIndex="jobTitle" title="Title" />
        {/* <Table.Column dataIndex="phone" title="Phone" /> */}
        <Table.Column
          dataIndex="status"
          title="Status"
          render={(value) => <Tag color="green">{value}</Tag>}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
