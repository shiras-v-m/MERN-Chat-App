import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {
  const navigate = useNavigate()
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [password, setPassword] = useState('')
  const [pic, setPic] = useState('')
  const [loading, setLoading] = useState('')
  const toast = useToast()
  const postDetails = (pics) => {
    setLoading(true)
    if (pics === undefined) {
      toast({
        title: 'Please select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })

      return
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData()
      data.append("file", pics)
      data.append("upload_preset", "mern-chat-app")
      data.append("cloud_name", "mychatapp1")
      fetch("https://api.cloudinary.com/v1_1/mychatapp1/image/upload", {
        method: 'post', body: data
      }).then((res) => res.json())
        .then(data => {
          console.log(data);
          setPic(data.url.toString())
          setLoading(false)
        })
        .catch((err) => {
          console.log(err);
          setLoading(false)
        }) //get from cloudinary documentation

    }
    else {
      toast({
        title: 'Unsupported Image file!',
        status: 'warning',
        duration: 7000,
        isClosable: true,
        position: "bottom"
      })

    }
  }

  const submitHandler = async () => {
    setLoading(true)
    if (!name || !email || !password || !confirmPassword) {
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
    if (password != confirmPassword) {
      toast({
        title: 'password doesnot match',
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
      const { data } = await axios.post('/api/user', { name, email, password, pic }, config)
      toast({
        title: 'Registration successfull',
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
    <VStack spacing={'5px'} >
      {/* Name*/}
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input onChange={(e) => setName(e.target.value)} placeholder='Enter you Name ' variant={'filled'} />
      </FormControl>
      {/* email */}
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input onChange={(e) => setEmail(e.target.value)} placeholder='Enter you Email ' variant='filled' />
      </FormControl>
      {/* password */}
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input type={show ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} placeholder='Password here ' variant='filled' />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/*Confirm password */}
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input type={show ? 'text' : 'password'} onChange={(e) => setConfirmPassword(e.target.value)} placeholder='Confirm Password here ' variant='filled' />
          <InputRightElement width='4.5rem'>
            <Button h='1.75rem' size='sm' onClick={handleClick}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* For uploading picture */}
      <FormControl id='pic'>
        <FormLabel>Upload your picture</FormLabel>
        <Input type='file' p={1.5} accept='image/*' onChange={(e) => { postDetails(e.target.files[0]) }} />
      </FormControl>

      <Button isLoading={loading} colorScheme='blue' width={"100%"} style={{ marginTop: 15 }} onClick={submitHandler}>SignUp</Button>
    </VStack>
  )
}

export default SignUp