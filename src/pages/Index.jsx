import { useState } from 'react';
import { Box, Button, Container, Flex, Heading, Input, List, ListItem, Text, useToast, IconButton } from '@chakra-ui/react';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const handleAddTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'Cannot add empty task',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input, isEditing: false }]);
    setInput('');
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const handleEditTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, isEditing: true } : task));
  };

  const handleSaveTask = (id, newText) => {
    if (newText.trim() === '') {
      toast({
        title: 'Cannot save empty task',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText, isEditing: false } : task));
  };

  return (
    <Container maxW="container.md" py={8}>
      <Flex direction="column" gap={4}>
        <Heading mb={6}>Todo App</Heading>
        <Flex as="nav">
          <Button mr={2}>Home</Button>
          <Button>Settings</Button>
        </Flex>
        <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
        <Button onClick={handleAddTask} colorScheme="blue" mt={2}>Add Task</Button>
        <List spacing={3}>
          {tasks.map(task => (
            <ListItem key={task.id} p={2} shadow="md">
              {task.isEditing ? (
                <Input defaultValue={task.text} onBlur={(e) => handleSaveTask(task.id, e.target.value)} autoFocus />
              ) : (
                <Flex justify="space-between" align="center">
                  <Text>{task.text}</Text>
                  <Flex>
                    <IconButton icon={<FaEdit />} onClick={() => handleEditTask(task.id)} aria-label="Edit task" />
                    <IconButton icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} aria-label="Delete task" ml={2} />
                  </Flex>
                </Flex>
              )}
            </ListItem>
          ))}
        </List>
      </Flex>
    </Container>
  );
};

export default Index;