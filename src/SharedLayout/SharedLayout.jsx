import React from 'react'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { Footer } from '../components/Footer'
import { Outlet } from 'react-router-dom'

export function SharedLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />

        </>
    )
}
