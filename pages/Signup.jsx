import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Toast,
} from '@chakra-ui/react'

import { useState, useRef, useEffect } from 'react'
import { AddIcon, CheckIcon, CloseIcon, InfoIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { NavLink } from 'react-router-dom'
import axios from "../src/api/axios"

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const USER_REGEX = /^[A-Za-zА-Яа-я][A-Za-zА-Яа-я0-9-_]{2,23}$/;
const PWD_REGEX = /^(?=.*[a-zа-я])(?=.*[A-ZА-Я])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/signup"

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false)

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
}, [])

  useEffect(() => {
      setValidName(USER_REGEX.test(user));
  }, [user])

  useEffect(() => {
      setValidEmail(EMAIL_REGEX.test(email));
  }, [email])

  useEffect(() => {
      setValidPwd(PWD_REGEX.test(pwd));
      setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd])

  useEffect(() => {
      setErrMsg('');
  }, [user, pwd, matchPwd])

  const showToast = () => {
    toast({
      title: "Logged out",
      description: "Successfully logged out",
      duration: 3000,
      isClosable: true,
      status: "success",
      position: "top",
      icon: <UnlockIcon />
    })
  }

  const handSubmit = async (event) => {
    event.preventDefault();
    // анти js hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);

    console.log(user, pwd, email)

    if (!v1 || !v2) {
      setErrMsg("Ошибка ввода, заполните все поля");
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL, JSON.stringify({user, pwd, email}), 
      {
        headers: {'Content-Type' : 'application/json'},
        withCredentials: true
      }
    );
    console.log(response.data)
    console.log(response.accessToken)
    console.log(JSON.stringify(response))
    setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Нет ответа сервера')
      }
      else if (err.response?.status === 409) {
        setErrMsg('Имя пользователя занято')
      }
      else  {
        setErrMsg("Регистрация не удалась")
      }
      errRef.current.focus();
    }

  }



  return (
    <>
      {success ? 
      <section>
        
        <p> kek </p>
      </section>
      : 
      
    ( 
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Text ref={errRef}>{errMsg}</Text>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features  🐯
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <FormControl  >
              <FormLabel htmlFor='username'>
              <Text>
                  Email address:
                  {validEmail ? <CheckIcon color="green" boxSize={3} ml={2}/> : ""}
                  {validEmail || !email ? "" : <CloseIcon color="red" ml={2} boxSize={3}/> }
                </Text>
              </FormLabel>
              <Input 
              type="email" 
              id="e-mail"
              autoComplete="off"
              onChange={(event) => setEmail(event.target.value)}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor='username'>
                <Text>
                  Username:
                  {validName ? <CheckIcon color="green" boxSize={3} ml={2}/> : ""}
                  {validName || !user ? "" : <CloseIcon color="red" ml={2} boxSize={3}/> }
                </Text>
              </FormLabel>
              <Input 
                type="text" 
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(event) => setUser(event.target.value)}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <Box id="uidnote"my={2}>{userFocus && user && !validName ? <Text><InfoIcon mr={2}/>Только 3 - 24 буквы.</Text>: ""}</Box>
            </FormControl>

            <FormControl id="password">
              <FormLabel htmlFor='password'>
                <Text>
                  Password:
                  {validPwd ? <CheckIcon color="green" boxSize={3} ml={2}/> : ""}
                  {validPwd || !pwd ? "" : <CloseIcon color="red" ml={2} boxSize={3}/> }
                </Text>

              </FormLabel>
              <InputGroup>
                <Input 
                  type={showPassword ? 'text' : 'password'}
                  onChange={(event) => setPwd(event.target.value)} 
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <InputRightElement h={'full'}>
                  <Button
                    
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Box id="pwdnote" my={2} >{pwdFocus && !validPwd ? 
              <Text><InfoIcon mr={2}/>
                Только 8 - 24 буквы. 
                <br></br>Минимум 1 Заглавная буква.
                <br></br>Минимум 1 строчная буква.
                <br></br>Минимум 1 спец символ: @!#$%
                </Text>: ""}
              </Box>


              <FormLabel pt={4} htmlFor="confirm_pwd">
              <Text>
                  Confirm Password:
                  {validMatch && matchFocus ? <CheckIcon color="green" boxSize={3} ml={2}/> : ""}
                  {validMatch || !matchPwd ? "" : <CloseIcon color="red" ml={2} boxSize={3}/> }
                </Text>
              </FormLabel>
              <InputGroup >
                <Input 
                  type={showPassword ? 'text' : 'password'} 
                  id="confirm_pwd"
                  onChange={(event) => setMatchPwd(event.target.value)}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <InputRightElement h={'full'}>
                  <Button
                    
                    variant={'ghost'}
                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>

              </InputGroup>
              <Box id="confirmnote"my={2}>{matchFocus && !validMatch ? <Text><InfoIcon mr={2}/>Пароли не совпадают.</Text>: ""}</Box>
            

            </FormControl>
            <Stack spacing={10} pt={2}>

              <Button
                onClick={handSubmit}
                loadingText="Submitting"
                size="lg"
                bg={ !validName || !validPwd || !validMatch ? "blue.100" :'blue.400'}
                color={'white'}
                
                _hover={{
                  bg: !validName || !validPwd || !validMatch ? "blue.100" :'blue.500',
                }}
                >
                Sign up
              </Button>

            </Stack>
            <Stack pt={6}>
              <Box align={'center'}>
                Уже есть аккаунт? <NavLink to="/login"><Text color={'blue.400'}>Войти</Text></NavLink>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )}
  </>
  )
}