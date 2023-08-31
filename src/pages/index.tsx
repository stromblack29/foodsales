import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import FoodTable from '@/components/food-table'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <FoodTable />
    </>
  )
}
