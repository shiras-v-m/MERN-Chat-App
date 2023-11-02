import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useToast()


  const submitHandler = async () => {

    setLoading(true)
    if (!email || !password) {
      toast({
        title: 'Please fill all the fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
      setLoading(false)
      return
    }


    try {
      const config = {
        headers: {
          "content-type": "application/json"
        }
      }
      const { data } = await axios.post('/api/user/login', { email, password }, config)
      toast({
        title: 'Logged In successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
      localStorage.setItem('userInfo', JSON.stringify(data))
      navigate('/chats')
    }
    catch (error) {
      toast({
        title: 'Error occured',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
      setLoading(false)
    }
  }
  return (
    <VStack spacing={'5px'}>

      {/* email */}
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter you Email ' variant='filled' />
      </FormControl>

      {/* password */}
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input value={password} type={show ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} placeholder='Password here ' variant='filled' />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button colorScheme='blue' width={"100%"} style={{ marginTop: 15 }} isLoading={loading} onClick={submitHandler}>Login</Button>
      <Button colorScheme='red' width={"100%"} style={{ marginTop: 15 }} onClick={() => {
        setEmail("guest@example.com")
        setPassword("123456")
      }}>Get Guest user credentials</Button>
    </VStack>
  )
}

export default Login