import HerbCard from '../components/HerbCard'
import { Link, useLocation, useParams } from 'react-router-dom'
import Pagination from '../components/Pagination'
import SearchKeyword from '../components/SearchKeyword'
import { useMemo } from 'react'

const herbs = [
  {
    title: {
      name: 'กรดจิมเนมิก',
      sci: 'Gymnemic acid'
    },
    image: 'kraj.jpg',
    desc: 'กรดจิมเนมิก (Gymnemic acid) เป็นสารสกัดที่ได้จากธรรมชาติในกลุ่มไตรเทอร์ปีนซาโปนิน (triterpene saponin) ที่มีสูตรทางเคมี คือ C40H66O14 มีมวลโมเลกุล 806.98 g/mol และมีโครงสร้างโมเลกุล ซึ่งประกอบไปด้วยสารประกอบไตรเทอ พีนอยด์กรดไขมัน และสารคล้ายคลึงกับโมเลกุลของน้ำตาลกลูโคส ที่เรียกว่า glucuronic acid โดยโครงสร้างส่วนกลางของกรดจิมเนมิก ได้แก่ aglycone gymnemagenin ที่ประดับด้วยน้ำตาล glucuronic และกลุ่มเอสเทอร์ต่างๆ ซึ่งรูปแบบเหล่านี้จะทำให้เกิดกรดยิมเนมิกที่แตกต่างกัน ซึ่งรูปแบบของกรดจิมเนมิกนี้มีมากกว่า 20 รูปแบบ และจะแตกต่างกันไปตามสารประกอบทางเคมีภายในโครงสร้างโมเลกุลของชนิดนั้นๆ โดยสาร Gymnemic acid I (กรดจิมเนมิกที่พบในผักเชียงดา มีคุณสมบัติต้านความหวานสูงสุด'
  },
  {
    title: {
      name: 'ฟลาโวนอยด์',
      sci: 'Flavonoid'
    },
    image: 'krateam.jpg',
    desc: 'ฟลาโวนอยด์ (flavonoid) เป็นสารประกอบฟินอล (phenolic compounds) ประเภทพอลิฟีนอล (polyphenol) มีสูตรโครงสร้างทางเคมีเป็นวงแหวนแอโรมาติก (aromatic ring) ที่มีจำนวนหมู่ไฮดรอกซิล (hydroxyl group) รวมอยู่ในโมเลกุล ตั้งแต่ 2 วงขึ้นไป สามารถละลายในน้ำได้ ส่วนใหญ่มักพบอยู่รวมกับน้ำตาล ในรูปของสารประกอบไกลโคไซด์ (glycoside) สารประกอบ flavonoids ได้แก่ flavonol, flavonone, flavone, isoflavone, flavonol catechin และ anthocyanins'
  },
  {
    title: {
      name: 'วิตามินซี',
      sci: 'Ascorbic acid'
    },
    image: 'king.jpg',
    desc: 'กรดแอสคอร์บิก (ascorbic acid) หรือที่รู้จักกันโดยทั่วไปว่า วิตามินซี (Vitamin C) เป็นสิ่งที่ ร่างกายมนุษย์ไม่สามารถสร้างขึ้นเองได้จึงต้องใช้วิธีต่างๆเพื่อพาวิตามินซีเข้าสู่ร่างกาย ไม่ว่าจะเป็น รับประทานผักผลไม้ โดยมากวิตามินซีจะอยู่ในกลุ่มของอาหารประเภทผักและผลไม้ชนิดต่างๆ พบมากในส้ม สับปะรด มะขาม สตอร์เบอร์รี่ ฝรั่ง มะนาว มะเขือเทศหากใครไม่รับประทานก็สามารถใช้วิธีอื่นร่วมได้เช่น  ทา ฉีด หรือดริป เป็นต้น'
  },
  {
    title: {
      name: 'กรดโอเลอิก',
      sci: 'Oleic acid'
    },
    image: 'kilek.jpg',
    desc: 'Oleic acid มีชื่อทางเคมีว่า octadecenoic acid เป็นกรดไขมัน (fatty acid) ประเภทกรดไขมันชนิดไม่อิ่มตัว ที่มีจำนวนคาร์บอน 18 อะตอม มีพันธะคู่ (double bond) 1 อัน ที่คาร์บอนตำแหน่งที่ 9 จัดเป็นไขมันไม่อิ่มตัวเชิงเดี่ยว monounsaturated fatty acidน้ำมันมะกอกเป็นแหล่งที่อุดมไปด้วยกรดโอเลอิก Oleic acid หรือ Omega-9 เป็นของเหลวสีเหลืองซีดมีกลิ่นคล้ายน้ำมันหมู นอกจากนี้ยังเป็นกรดไขมันไม่อิ่มตัวเชิงเดี่ยว กรดไขมันเป็นส่วนประกอบหลักของไขมันในอาหาร น้ำมัน และไขมันที่สะสมในสัตว์และมนุษย์ นอกจากการทำงานภายในร่างกายแล้ว ไขมันไม่อิ่มตัวเชิงเดี่ยว เช่น กรดโอเลอิก ยังมีการเน่าเสียน้อยกว่าไขมันชนิดอื่นๆ ทำให้มีประโยชน์ในการถนอมอาหาร กรดโอเลอิกมักใช้เพื่อป้องกันโรคหัวใจและลดคอเลสเตอรอล นอกจากนี้ยังใช้เพื่อป้องกันมะเร็งและภาวะอื่นๆ'
  },
  {
    title: {
      name: 'กรดพัลมิติก',
      sci: 'Palmitic acid'
    },
    image: 'takri.jpg',
    desc: 'Palmitic Acid  เป็นกรดไขมันชนิดอิ่มตัว (Saturated Fatty Acid) พบมากในน้ำมันปาล์ม เป็นกรดไขมันชนิดอิ่มตัวที่ได้จากพืชตระกลูมะพร้าว (Coconut) และ ปาล์ม(Palm) มีจำนวนคาร์บอนในโมเลกุลเท่ากับ 16 (C 16 : 0) กรดปาล์มิติก (Palmitic Acid) มีชื่อทางเคมีว่า  hexadecanoic acid กรดปาล์มิติก พบได้ในน้ำมันพืช (Vegetable oil) โดยพบมากในน้ำมันมะพร้าว (Coconut oil) และน้ำมันจากเนื้อปาล์ม (Palm kernel oil) นิยมนำไปใช้ในอุตสาหกรรม เครื่องสำอาง สบู่ ผลิตภัณฑ์ทำความสะอาดผิว  นิยมใช้เป็นสารที่ช่วยทำให้เกิดการรมตัวกันของสารอื่นๆ ในตำรับ  และเป็นสารลดเเรงตึงผิวในสูตรผลิตภัณฑ์ชำระล้างทำความสะอาด เช่น ครีมอาบน้ำ แชมพู เป็นต้น'
  }
]

function Herb() {
  const { search } = useLocation()
  const queryString = new URLSearchParams(search).get('searchText')
  return (
    <div className='flex flex-col gap-4 sm:px-2 md:px-4 lg:px-8 xl:px-12'>
      <SearchKeyword keyword={queryString} />
      {herbs.map((herb, index) => (
        <Link to={`${location.pathname}/${herb.title.name}`} key={index}>
          <HerbCard herb={herb}></HerbCard>
        </Link>
      ))}
      <div className='flex flex-col items-center'>
        <Pagination />
      </div>
    </div>
  )
}

export default Herb