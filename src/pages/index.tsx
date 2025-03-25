import React from 'react'
import Head from 'next/head'
import { Box, Container, Typography } from '@mui/material'

export default function Home() {
  return (
    <>
      <Head>
        <title>SecretWhisper - Secure Decentralized Communication</title>
        <meta name="description" content="SecretWhisper - A secure, decentralized communication platform enabling private and encrypted messaging across blockchain networks." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h1" component="h1" gutterBottom align="center">
            SecretWhisper
          </Typography>
          <Typography variant="h2" component="h2" gutterBottom align="center">
            Secure. Private. Decentralized.
          </Typography>
        </Box>
      </Container>
    </>
  )
} 