"use client";

import { useState } from "react";
import {
  Text,
  Group,
  Button,
  Modal,
  TextInput,
  Textarea,
  Stack,
  Menu,
  Table,
  ActionIcon,
  rem,
  Paper,
  Pagination,
  Center,
  Space,
} from "@mantine/core";
import {
  IconDotsVertical,
  IconEdit,
  IconTrash,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  Portfolio,
  CreatePortfolioDto,
  updatePortfolio,
  deletePortfolio,
  createPortfolio,
} from "@/utils/portfolio";

interface PortfolioListProps {
  portfolios: Portfolio[];
}

export function PortfolioList({
  portfolios: initialPortfolios,
}: PortfolioListProps) {
  const [portfolios, setPortfolios] = useState<Portfolio[]>(initialPortfolios);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(
    null
  );
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [
    isDeleteModalOpen,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);
  const [isEditModalOpen, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [
    isCreateModalOpen,
    { open: openCreateModal, close: closeCreateModal },
  ] = useDisclosure(false);
  const [editForm, setEditForm] = useState<CreatePortfolioDto>({
    portfolioName: "",
    description: "",
  });
  const [createForm, setCreateForm] = useState<CreatePortfolioDto>({
    portfolioName: "",
    description: "",
  });

  
  const handleEdit = async () => {
    try {
      if (!selectedPortfolio) return;
      const updatedPortfolio = await updatePortfolio(
        selectedPortfolio.id,
        editForm
      );
      setPortfolios(
        portfolios.map((p) =>
          p.id === updatedPortfolio.id ? updatedPortfolio : p
        )
      );
      notifications.show({
        title: "Success",
        message: "Portfolio updated successfully",
        color: "green",
      });
      closeEditModal();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to update portfolio",
        color: "red",
      });
    }
  };

  const handleDelete = async () => {
    try {
      if (!selectedPortfolio) return;
      await deletePortfolio(selectedPortfolio.id);
      setPortfolios(portfolios.filter((p) => p.id !== selectedPortfolio.id));
      notifications.show({
        title: "Success",
        message: "Portfolio deleted successfully",
        color: "green",
      });
      closeDeleteModal();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to delete portfolio",
        color: "red",
      });
    }
  };

  const handleCreate = async () => {
    try {
      const newPortfolio = await createPortfolio(createForm);
      setPortfolios([...portfolios, newPortfolio]);
      notifications.show({
        title: "Success",
        message: "Portfolio created successfully",
        color: "green",
      });
      closeCreateModal();
      setCreateForm({ portfolioName: "", description: "" });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to create portfolio",
        color: "red",
      });
    }
  };

  const filteredPortfolios = portfolios.filter(
    (portfolio) =>
      portfolio.portfolioName.toLowerCase().includes(search.toLowerCase()) ||
      portfolio.description.toLowerCase().includes(search.toLowerCase())
  );

  const pageSize = 10;
  const pageCount = Math.ceil(filteredPortfolios.length / pageSize);
  const paginatedPortfolios = filteredPortfolios.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  if (portfolios.length === 0) {
    return (
      <Paper shadow="xs" mih={400} p="md" radius="md">
          <Stack justify="center" align="center" mih={400}>
            <Text align="center" size="lg" >You do not have any portfolio yet. Start by Adding the first one</Text>
            <Space h="md" />
            <Button
                onClick={openCreateModal}
                variant="filled"
                leftSection={<IconPlus size={16} />}
            >
              Create Portfolio
            </Button>
          </Stack>
        <Modal
            opened={isCreateModalOpen}
            onClose={() => {
              closeCreateModal();
              setCreateForm({ portfolioName: "", description: "" });
            }}
            title="Create Portfolio"
            styles={{ title: { fontSize: rem(18), fontWeight: 600 } }}
            centered
        >
          <Stack>
            <TextInput
                label="Name"
                placeholder="Portfolio name"
                value={createForm.portfolioName}
                onChange={(e) =>
                    setCreateForm({
                      ...createForm,
                      portfolioName: e.currentTarget.value,
                    })
                }
                required
            />
            <Textarea
                label="Description"
                placeholder="Portfolio description"
                value={createForm.description}
                onChange={(e) =>
                    setCreateForm({
                      ...createForm,
                      description: e.currentTarget.value,
                    })
                }
                minRows={3}
            />
            <Group justify="flex-end" mt="md">
              <Button
                  variant="light"
                  onClick={() => {
                    closeCreateModal();
                    setCreateForm({ portfolioName: "", description: "" });
                  }}
              >
                Cancel
              </Button>
              <Button onClick={handleCreate}>Create</Button>
            </Group>
          </Stack>
        </Modal>
      </Paper>
    );
  }
  

  return (
    <Paper shadow="xs" p="md" radius="md">
      <Stack gap="lg">
        <Group justify="space-between">
          <TextInput
            placeholder="Search Portfolio"
            leftSection={<IconSearch size={16} />}
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            style={{ width: rem(300) }}
          />
          <Button
            onClick={openCreateModal}
            variant="filled"
            leftSection={<IconPlus size={16} />}
          >
            Create Portfolio
          </Button>
        </Group>

        <Table
          highlightOnHover
          highlightOnHoverColor="var(--mantine-color-primary-1)"
          withTableBorder
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th w="30%">Name</Table.Th>
              <Table.Th w="40%">Description</Table.Th>
              <Table.Th w="20%">Created</Table.Th>
              <Table.Th w="10%">Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {paginatedPortfolios.map((portfolio) => (
              <Table.Tr key={portfolio.id}>
                <Table.Td>
                  <Text>{portfolio.portfolioName}</Text>
                </Table.Td>
                <Table.Td>
                  <Text lineClamp={2}>{portfolio.description}</Text>
                </Table.Td>
                <Table.Td>
                  <Text>
                    {new Date(portfolio.created).toLocaleDateString()}
                  </Text>
                </Table.Td>
                <Table.Td>
                  <Menu position="bottom-end" shadow="md">
                    <Menu.Target>
                      <ActionIcon variant="subtle" size="sm">
                        <IconDotsVertical size={16} />
                      </ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        leftSection={<IconEdit size={16} />}
                        onClick={() => {
                          setSelectedPortfolio(portfolio);
                          setEditForm({
                            portfolioName: portfolio.portfolioName,
                            description: portfolio.description,
                          });
                          openEditModal();
                        }}
                      >
                        Edit
                      </Menu.Item>
                      <Menu.Item
                        leftSection={<IconTrash size={16} />}
                        color="red"
                        onClick={() => {
                          setSelectedPortfolio(portfolio);
                          openDeleteModal();
                        }}
                      >
                        Delete
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>

        <Pagination
          total={pageCount}
          value={currentPage}
          onChange={setCurrentPage}
          ps="right"
        />
      </Stack>

      <Modal
        opened={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Portfolio"
        styles={{ title: { fontSize: rem(18), fontWeight: 600 } }}
        centered
      >
        <Stack>
          <TextInput
            label="Name"
            placeholder="Portfolio name"
            value={editForm.portfolioName}
            onChange={(e) =>
              setEditForm({ ...editForm, portfolioName: e.currentTarget.value })
            }
          />
          <Textarea
            label="Description"
            placeholder="Portfolio description"
            value={editForm.description}
            onChange={(e) =>
              setEditForm({ ...editForm, description: e.currentTarget.value })
            }
            minRows={3}
          />
          <Group justify="flex-end" mt="md">
            <Button variant="light" onClick={closeEditModal}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>Save changes</Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={isDeleteModalOpen}
        onClose={closeDeleteModal}
        title="Delete Portfolio"
        centered
        styles={{ title: { fontSize: rem(18), fontWeight: 600 } }}
      >
        <Text size="sm" mb="lg">
          Are you sure you want to delete this portfolio? This action cannot be
          undone.
        </Text>
        <Group justify="flex-end">
          <Button variant="light" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button color="red" onClick={handleDelete}>
            Delete
          </Button>
        </Group>
      </Modal>

      <Modal
        opened={isCreateModalOpen}
        onClose={() => {
          closeCreateModal();
          setCreateForm({ portfolioName: "", description: "" });
        }}
        title="Create Portfolio"
        styles={{ title: { fontSize: rem(18), fontWeight: 600 } }}
        centered
      >
        <Stack>
          <TextInput
            label="Name"
            placeholder="Portfolio name"
            value={createForm.portfolioName}
            onChange={(e) =>
              setCreateForm({
                ...createForm,
                portfolioName: e.currentTarget.value,
              })
            }
            required
          />
          <Textarea
            label="Description"
            placeholder="Portfolio description"
            value={createForm.description}
            onChange={(e) =>
              setCreateForm({
                ...createForm,
                description: e.currentTarget.value,
              })
            }
            minRows={3}
          />
          <Group justify="flex-end" mt="md">
            <Button
              variant="light"
              onClick={() => {
                closeCreateModal();
                setCreateForm({ portfolioName: "", description: "" });
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleCreate}>Create</Button>
          </Group>
        </Stack>
      </Modal>
    </Paper>
  );
}
