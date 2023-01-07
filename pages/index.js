// import Head from 'next/head'
// import Image from 'next/image'
import { Inter } from '@next/font/google'
// import styles from '../styles/Home.module.css'
// import { Flex, Spacer } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter, Flex } from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Button,
  Box,
  Checkbox,
  Form,
  // BorderRadius
  // Field,
  Heading,
  BoxShadow,
  Text
} from '@chakra-ui/react'
// import { extendTheme } from '@chakra-ui/react'

import { Formik, Field } from 'formik'

import { PhoneIcon, CheckIcon, WarningIcon } from '@chakra-ui/icons'

import { Stack, HStack, VStack } from '@chakra-ui/react'

import { useState } from 'react'
import React from 'react'

  

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  // const [input, setInput] = useState('')

  // const handleInputChange = (e) => setInput(e.target.value)

  // const isError = input === ''

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)

  return (
    <>
    <Flex bg='gray.100' align='center' justify='center' h='100vh'>
      <Card as='b' bg='white' px={4} py={7} rounded='xl' w={450} boxShadow='2xl'>
        <CardHeader  mb={2} py={1} align='center'>
          <Text fontSize='xl' size='md'>GRADE PORTAL</Text>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            onSubmit={(values) => {
              alert(JSON.stringify(values, null, 2));
            }}
          >
            {({ handleSubmit, errors, touched }) => (
              <form onSubmit={handleSubmit}>
                <VStack spacing={5} align='flex-start'>
                  <FormControl>
                    {/* <FormLabel htmlFor='email'>Email Address</FormLabel> */}
                    <Field 
                      as={Input} 
                      id='email' 
                      name='email' 
                      type='email' 
                      variant='filled' 
                      placeholder='Email'
                      required
                    />
                  </FormControl>
                  <FormControl
                    isInvalid={!!errors.password && touched.password}
                  >
                    {/* <FormLabel htmlFor='password'>Password</FormLabel> */}
                    <Field 
                      as={Input} 
                      id='password' 
                      name='password' 
                      type='password' 
                      variant='filled'
                      placeholder='Password'
                      required
                      validate={(value) => {
                        if(value.length <=6) {
                          return 'Password should be over 6 characters';
                        }
                      }}
                    />
                    <FormErrorMessage>{errors.password}</FormErrorMessage>
                  </FormControl>
                  </VStack>
                  <Button
                    type='submit'
                    colorScheme='green'
                    w='full'
                    mt={8}
                  >
                    LOGIN
                  </Button>
              </form>
            )}
          </Formik>
        </CardBody>
      </Card>
    </Flex>
    </>
  )
}
