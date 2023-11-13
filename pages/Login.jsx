

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useRef, useState, useEffect} from 'react';
import axios from '../src/api/axios';
import useAuth from '../hooks/useAuth';
import {Link, useNavigate, useLocation} from "react-router-dom"

const LOGIN_URL = "/api/v0/login/"

export default function Login() {
const {setAuth} = useAuth();

const navigate = useNavigate()
const location = useLocation()
const from = location.state?.from?.pathname || "/"

const userRef = useRef()
const errRef = useRef()

const [user, setUser] = useState('');
const [pwd, setPwd] = useState('');
const [errMsg, setErrMsg] = useState('');

useEffect(() => {
    userRef.current.focus();
}, [])

useEffect(() => {
    setErrMsg('');
}, [user, pwd])

const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    const response = await axios.post(LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        }
    );
    console.log(JSON.stringify(response?.data));
    console.log(JSON.stringify(response));

    const accessToken = response?.data?.accessToken;
    const roles = response?.data?.roles;

    setAuth({ user, pwd, roles, accessToken });
    setUser('');
    setPwd('');
    navigate(from, {replace: true });
} catch (err) {
    if (!err?.response) {
        setErrMsg('Нет ответа от сервера');
    } else if (err.response?.status === 400) {
        setErrMsg('Неправильный username или пароль');
    } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
    } else {
        setErrMsg('Login Failed');
    }
    errRef.current.focus();
}


}

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
        <Text ref={errRef}>{errMsg}</Text>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool 🦁
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl id="text">
              <FormLabel htmlFor="username">username</FormLabel>
              <Input 
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(event) => setUser(event.target.value)}
              value={user}
              required
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input 
              type="password"
              id="password"
              onChange={(event) => setPwd(event.target.value)}
              value={pwd}
              required
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox>Remember me</Checkbox>
                <Text color={'blue.400'}>Forgot password?</Text>
              </Stack>
              <Button
                bg={'blue.400'}
                color={'white'}
                onClick={handleSubmit}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}