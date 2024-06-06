import React, { useState, useEffect } from 'react';
import {
    Box, Flex,
    Button, Input, Switch, IconButton,
    Table, Thead, Tbody, Tr, Th, Td,
    Text, Image,
    useToast,
} from '@chakra-ui/react';
import { NotAllowedIcon, DeleteIcon, CopyIcon, TriangleUpIcon, TriangleDownIcon, MinusIcon } from "@chakra-ui/icons";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { CONTENEURS_TEST } from '../constantes';

const DockerAdminPage = () => {
    const [containers, setContainers] = useState(CONTENEURS_TEST);                      // Conteneurs trouvés
    const [searchTerm, setSearchTerm] = useState('');                                   // Terme de la recherche de nom
    const [numEtu, setNumEtu] = useState('');                                           // Terme de la recherche de num étudiant
    const [creationDisabled, setCreationDisabled] = useState(false);                    // Bloquage de la création de conteneurs
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });      // Tri du tableau

    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        setContainers(containers.filter(container => container.name.startsWith('CAT_sandbox_'))); // A SUPPRIMER AU FINAL

        const fetchContainers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/containers');
                setContainers(response.data.filter(container => container.name.startsWith('/CAT_sandbox_')));
            } catch (error) {
                console.error('Error fetching containers:', error);
            }
        };

        fetchContainers();
        const interval = setInterval(fetchContainers, 10000);
        return () => clearInterval(interval);
    }, []);

    const handleStopAll = async () => {
        try {
            await axios.post('http://localhost:5000/api/containers/stop-all');
            toast({
                title: 'Arrêt total conteneurs',
                status: 'success'
            });
            setContainers([]);
        } catch (error) {
            toast({
                title: 'Erreur arrêt total conteneurs',
                status: 'error'
            });
            console.error('Erreur dans l\'arrêt des conteneurs :', error);
        }
    };

    const handleStopContainer = async (id) => {
        try {
            await axios.post(`http://localhost:5000/api/containers/${id}/stop`);
            toast({
                title: 'Conteneur arrêté',
                status: 'success'
            });
            setContainers(containers.filter(container => container.id !== id));
        } catch (error) {
            toast({
                title: 'Erreur arrêt conteneur',
                status: 'error'
            });
            console.error('Erreur dans l\'arrêt du conteneur :', error);
        }
    };

    const handleDeleteContainer = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/containers/${id}`);
            toast({
                title: 'Conteneur supprimé',
                status: 'success'
            });
            setContainers(containers.filter(container => container.id !== id));
        } catch (error) {
            toast({
                title: 'Erreur suppression conteneur',
                status: 'error'
            });
            console.error('Erreur suppression conteneur:', error);
        }
    };

    const handleSearch = (event) => {
        const { name, value } = event.target;
        if (name === 'searchTerm') setSearchTerm(value.toUpperCase());
        if (name === 'numEtu') setNumEtu(value);
    };

    const sortedContainers = [...containers].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });

    const filteredContainers = sortedContainers.filter(container => {
        const namePart = container.name.split('_')[2].toUpperCase(); // Extract the name part
        return namePart.includes(searchTerm) && container.numEtu.includes(numEtu);
    });

    const requestSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const getIcon = (key) => {
        if (sortConfig.key !== key) return <MinusIcon />;
        if (sortConfig.direction === 'asc') return <TriangleUpIcon />;
        return <TriangleDownIcon />;
    };

    return (
        <Box minH="100vh" bg="#121212" color="gray.500" px={6} py={8}>

            <Image mt="-1%" src='img/CAT.png' mr='auto' ml='auto' alt='Logo CAT' border="2px solid teal" borderRadius="full" boxSize="6%" onClick={() => navigate('/')} cursor="pointer" />

            <Flex justifyContent="space-between" mb={4}>
                <Text fontSize="3xl" color="white">Administration Docker</Text>
                <Button
                    color={"red.500"}
                    border={"2px solid"}
                    _hover={{ bg: "red.200" }}
                    onClick={handleStopAll}
                >
                    Tout arrêter
                </Button>
            </Flex>
            <Flex mb={4} justifyContent="space-between" alignItems="center">
                <Text color="gray">Nombre de conteneurs: {filteredContainers.length}</Text>
                <Switch
                    isChecked={creationDisabled}
                    colorScheme='orange'
                    color={!creationDisabled ? 'gray' : 'orange'}
                    onChange={() => setCreationDisabled(!creationDisabled)}
                >
                    Verrouiller création
                </Switch>
            </Flex>
            <Flex mb={4}>
                <Input
                    placeholder="Rechercher par nom"
                    name="searchTerm"
                    value={searchTerm}
                    onChange={handleSearch}
                    mr={2}
                />
                <Input
                    placeholder="Rechercher par numero étudiant"
                    name="numEtu"
                    value={numEtu}
                    onChange={handleSearch}
                />
            </Flex>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th color="blue.400" onClick={() => requestSort('name')} cursor="pointer">
                            Nom {getIcon('name')}
                        </Th>
                        <Th color="blue.400" onClick={() => requestSort('state')} cursor="pointer">
                            Status {getIcon('state')}
                        </Th>
                        <Th color="blue.400">Actions</Th>
                        <Th color="blue.400" onClick={() => requestSort('cpuUsage')} cursor="pointer">
                            Utilisation CPU {getIcon('cpuUsage')}
                        </Th>
                        <Th color="blue.400" onClick={() => requestSort('memoryUsage')} cursor="pointer">
                            Utilisation Mémoire {getIcon('memoryUsage')}
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {filteredContainers.map((container) => (
                        <Tr key={container.id}>
                            <Td color="blue.100">{container.name}</Td>
                            <Td>{container.state === 'running' ? 'Lancé' : 'Arrêté'}</Td>
                            <Td>
                                <IconButton
                                    size="lg"
                                    aria-label="Stop Container"
                                    icon={<NotAllowedIcon color="yellow.300" />}
                                    onClick={() => handleStopContainer(container.id)}
                                    variant="ghost"
                                    _hover={{ bg: 'transparent' }}
                                />
                                <IconButton
                                    size="lg"
                                    aria-label="Delete Container"
                                    icon={<DeleteIcon color="red.300" />}
                                    onClick={() => handleDeleteContainer(container.id)}
                                    variant="ghost"
                                    _hover={{ bg: 'transparent' }}
                                />
                                <IconButton
                                    size="lg"
                                    aria-label="Open Container"
                                    icon={<CopyIcon color="blue.200" />}
                                    onClick={() => handleOpenContainer(container.id)} // Assuming you have a function to handle this
                                    variant="ghost"
                                    _hover={{ bg: 'transparent' }}
                                />
                            </Td>
                            <Td>
                                <Text>{container.cpuUsage.toFixed(2)}%</Text>
                            </Td>
                            <Td>
                                <Text>{container.memoryUsage.toFixed(2)} MB</Text>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default DockerAdminPage;
