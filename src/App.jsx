import {
  Box,
  Button,
  Center,
  Container,
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "./utils/constants";

const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateID, setUpdateID] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      console.log(res.data);
      setTasks(res.data);
    });
  }, [updateUI]);

  const addTask = () => {
    axios
      .post(`${baseURL}/post`, { task: input })
      .then((res) => {
        console.log(res.data);
        setInput("");
        setUpdateUI((prevState) => !prevState);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemove = (item) => {
    axios.delete(`${baseURL}/delete/${item}`).then((res) => {
      console.log(res);
      setUpdateUI((prevState) => !prevState);
    });
  };

  const handleUpdate = (item) => {
    console.log(item.task, item._id);
    setInput(item.task);
    setUpdateID(item._id);
  };

  const updateTask = () => {
    axios.put(`${baseURL}/update/${updateID}`, { task: input }).then((res) => {
      console.log(res.data);
      setUpdateUI((prevState) => !prevState);
      setUpdateID(null);
      setInput("");
    });
  };
  console.log(tasks);
  return (
    <>
      <Container maxW="xl">
        <Center>
          <Text fontSize="5xl">MERN CRUD</Text>
        </Center>
        <Box>
          <Center>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type Task"
              mr="5"
            />
            <Button
              onClick={updateID ? updateTask : addTask}
              type="submit"
              colorScheme="blue"
            >
              {updateID ? "Update Task" : "Create"}
            </Button>
          </Center>
        </Box>
        <Box>
          <TableContainer mt="10">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Tasks</Th>

                  <Th isNumeric>Task Info</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tasks.reverse().map((item, i) => (
                  <Tr key={i}>
                    <Td>{item.task}</Td>
                    <Td isNumeric>
                      <EditIcon
                        mr="5"
                        cursor="pointer"
                        onClick={() => handleUpdate(item)}
                      />
                      <DeleteIcon
                        cursor="pointer"
                        onClick={() => handleRemove(item._id)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
};

export default App;
