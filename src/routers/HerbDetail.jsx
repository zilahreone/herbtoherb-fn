import React from 'react'
import CardDetail from '../components/CardDetail'
import Table from '../components/Table'
import InputIcon from '../components/InputIcon'
import { ScrollRestoration, useParams } from 'react-router-dom'
import Tab from '../components/Tab'

const herbDetail = {
  name: 'กระเจี๊ยบแดง',
  desc: 'ไม้ล้มลุก ลักษณะลำต้นเป็นทรงพุ่ม อายุปีเดียว สูงประมาณ 1 – 2 เมตร ขนาดลำต้นประมาณ 1 - 2 ซม.แตกกิ่งก้านมากมายตั้งแต่โคนต้น เปลือกต้นเรียบ ต้นอ่อนมีสีเขียว เมื่อแก่ลำต้นและกิ่งก้านสีแดงเข้มหรือสีแดงอมม่วง เปลือกลำต้นบางเรียบ สามารถลอกเป็นเส้นได้ ใบ เป็นใบเดี่ยว ออกเรียงสลับตามความสูงของกิ่ง ลักษณะใบรูปสี่เหลี่ยมข้าวหลามตัด ยาวประมาณ 7 - 13 ซม. มีขนปกคลุมทั้งด้านบนด้านล่าง ขอบใบเป็นแฉกคล้ายนิ้วมือ 3 นิ้ว หรือเป็น 5 แฉก ระยะห่างระหว่างแฉก 0.5 - 3 ซม. ลึกประมาณ 3 - 8 ซม. มีหูใบเป็นเส้นเรียวยาว 0.8 - 1.5 ซม. โคนใบสอบเรียว ปลายใบแหลมหรือเรียวแหลม โคนใบมน แต่ละแฉกมีรูปใบหอก ขอบใบเป็นจักฟันเลื่อย มีเส้นใบ 3 – 7 เส้น สีแดง ใบด้านล่างนูนเด่น โคนเส้นกลางใบด้านท้องใบมีต่อม 1 ต่อม แผ่นใบสีเขียวเกลี้ยง ก้านใบยาว 4 – 15 ซม. มีขนรูปดาวปกคลุม ใบที่มีอายุน้อย และใบใกล้ดอกจะมีขนาดเล็กรูปไข่ ดอกเป็นดอกเดี่ยว ดอกแทงออกตามซอกใบตั้งแต่โคนกิ่งถึงปลายกิ่ง ดอกมีก้านดอกสั้น สีแดงม่วง ดอกมีกลีบเลี้ยง ประมาณ 5 กลีบ หุ้มดอกบนสุด มีขนาดใหญ่ มีลักษณะอวบหนา มีสีแดงเข้มหุ้มดอก และกลีบรองดอก ที่เป็นกลีบด้านล่างสุด มีขนาดเล็ก 8 - 12 กลีบ มีสีแดงเข้ม กลีบทั้ง 2 ชนิดนี้ จะติดอยู่กับดอกจนถึงติดผล และผลแก่ ไม่มีร่วง ดอกเมื่อบานจะมีกลีบดอกสีเหลืองหรือสีชมพูอ่อนหรือสีขาวแกมชมพู บริเวณกลางดอกมีสีเข้ม ส่วนของดอกมีสีจางลง เมื่อดอกแก่กลีบดอกจะร่วง ทำให้กลีบรองดอก และกลีบเลี้ยงเจริญขึ้นมาหุ้ม เกสรเพศผู้จำนวนมาก ผล เจริญจากดอก เป็นผลแห้งแตกได้ ลักษณะรูปรีปลายแหลมหรือรูปไข่ ยาวประมาณ 2.5 ซม. มีจงอยสั้นๆ มีจีบตามยาว และถูกหุ้มด้วยกลีบเลี้ยงสีแดงเข้ม ติดทนขนาดใหญ่รองรับอยู่จนผลแก่ มีขนหยาบๆ สีเหลืองปกคลุม เมล็ด ส่วนในของเมล็ดรูปไตสีน้ำตาลเกลี้ยงจำนวนมาก',
  title: 'ข้อมูลทั่วไป'
}
const tabs = [
  {
    name: 'การรับรอง',
    content: `a Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
  },
  {
    name: 'งานวิจัย',
    content: `b Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
  },
  {
    name: 'การตลาด',
    content: `c Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`
  },
]
const ingredient = ['phenolic acids', 'proanthocyanidns', 'flavonoid glycosides', 'myricetin']
function HerbDetail() {
  const { herbId } = useParams()
  return (
    <>
      <div className='flex md:flex-row flex-col gap-2'>
        <div className='md:w-3/4  flex flex-col gap-2 mx-4'>
          <p className="text-3xl font-bold text-gray-900 dark:text-white pl-4 mb-4">กระเจี๊ยบแดง</p>
          <CardDetail desc={herbDetail.desc} title={herbDetail.title}></CardDetail>
          <Tab tabs={tabs} />
        </div>
        <div className='flex flex-col gap-4 md:w-1/4 p-4'>
          <div className=''>
            <InputIcon />
          </div>
          {/* <div className=''>zxcvx</div> */}
          <div className=''>
            <Table
              head={
                <tr><th>สารออกฤทธิ์</th></tr>               
              }
              body={ingredient.map((ing, index) => (
                <tr key={index} className='hover:bg-gray-100 text-left'>
                  <th className='px-4 text-std py-1'>{ ing }</th>
                </tr>
              ))} />
          </div>
          <div className='mt-2'>  
            <CardDetail
              desc={
                <div className='flex flex-col gap-2'>
                  <p className=''>asdfasdf</p>
                  <p className=''>asdfasdf</p>
                  <p className=''>asdfasdf</p>
                </div>
              }
              title="ที่คล้ายกัน" />
          </div>
        </div>
      </div>
      {/* <div>
      </div> */}
    </>
  )
}

export default HerbDetail