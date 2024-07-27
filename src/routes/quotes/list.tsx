import React from "react";
import { IResourceComponentsProps, BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  TextField,
  CreateButton,
  FilterDropdown
} from "@refinedev/antd";
import { Table, Space, Input, Form, Select, Avatar } from "antd";
import Tag from "antd/lib/tag";
import {
  CheckCircleOutlined,
  CompressOutlined,
  ExpandOutlined,
  PlusCircleOutlined,
  SendOutlined
} from "@ant-design/icons";
import moment from "moment";
import { Text } from "@/components";
import { Participants } from "@/components/participants";
import { useUsersSelect } from "@/hooks/useUsersSelect";

export const QuotesList: React.FC<IResourceComponentsProps> = () => {

  const { selectProps: selectPropsUsers } = useUsersSelect();
  
  const { tableProps, searchFormProps } = useTable({
    meta: {
      fields: [
        "createdAt",
        "id",
        { company: ["id", "name", "avatarUrl"] },
        {salesOwner:["name", "id"]},
        "status",
        "title",
        "total",
      ]
    },
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
      headerButtons={({}) => (
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
        <CreateButton
          size="large"
          icon={<PlusCircleOutlined />}
          style={{ marginBottom: "30px" }}
        >
          Add quote
        </CreateButton>
      }
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column
          title="Title"
          render={(_, record: { title: string }) => (
            <Space>
              <TextField value={record.title} />
            </Space>
          )}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search Here" />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex={["company", "id"]}
          title="Company"
          render={(_, record: any) => {
            return (
              <Space>
                <Avatar shape="square" src={record.company.avatarUrl} />
                <Text style={{ whiteSpace: "nowrap" }}>
                  {record.company.name}
                </Text>
              </Space>
            );
          }}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search Here" />
            </FilterDropdown>
          )}
        />
        <Table.Column
          dataIndex="total"
          title="Total Amount"
          render={(value: string) => <span>{value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
        }
        />
        <Table.Column
          dataIndex="status"
          title="Stage"
          render={(value: string) => {
            let tagColor = "";
            let icon = null;
            switch (value) {
              case "SENT":
                tagColor = "cyan";
                icon = <SendOutlined />;
                break;
              case "DRAFT":
                tagColor = "processing";
                icon = <ExpandOutlined />;
                break;
              case "ACCEPTED":
                tagColor = "success";
                icon = <CheckCircleOutlined />;
                break;
              default:
                tagColor = "default";
                icon = "";
                break;
            }
            return (
              <Tag color={tagColor} icon={icon}>
                {value}
              </Tag>
            );
          }}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder="Search Here" />
            </FilterDropdown>
          )}
        />
        {/* <Table.Column
            dataIndex={["salesOwner", "id"]}
            title="Participants"
            filterDropdown={(props) => {
              return (
                <FilterDropdown {...props}>
                  <Select
                    style={{ width: "200px" }}
                    placeholder="Select Sales Owner"
                    {...selectPropsUsers}
                  />
                </FilterDropdown>
              );
            }}
            render={(_, record:any) => {
              return (
                <Participants
                  userOne={record.salesOwner}
                  userTwo={record.contact}
                />
              );
            }}
          /> */}
        {/* <Table.Column
            dataIndex={["salesOwner", "id"]}
            title="Participants"
            filterDropdown={(props) => {
              return (
                <FilterDropdown {...props}>
                  <Select
                    style={{ width: "200px" }}
                    placeholder="Select Sales Owner"
                    {...selectPropsUsers}
                  />
                </FilterDropdown>
              );
            }}
            render={(_, record) => {
              return (
                <Participants
                  userOne={record.salesOwner}
                  userTwo={record.contact}
                />
              );
            }}
          /> */}
        <Table.Column
          dataIndex="createdAt"
          title="Created At"
          render={(value: string) => moment(value).fromNow()}
          sorter={{ multiple: 2 }}
        />

        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <ShowButton
                hideText
                size="small"
                recordItemId={record.id}
                style={{ backgroundColor: "#fff" }}
              />
              <EditButton
                hideText
                size="small"
                recordItemId={record.id}
                style={{ backgroundColor: "#fff" }}
              />
              <DeleteButton
                hideText
                size="small"
                recordItemId={record.id}
                style={{ backgroundColor: "#fff" }}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
