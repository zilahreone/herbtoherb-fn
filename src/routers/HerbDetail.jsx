import React from 'react'
import CardDetail from '../components/CardDetail'
import Table from '../components/Table'
import InputIcon from '../components/InputIcon'
import { ScrollRestoration, useParams } from 'react-router-dom'
import Tab from '../components/Tab'
import Bagdes from '../components/Bagdes'
import Lists from '../components/Lists'

const ingredient = {
  functional_ingredient: 'Gymnamic acid',
  desc: 'กรดจิมเนมิก (Gymnemic acid) เป็นสารสกัดที่ได้จากธรรมชาติในกลุ่มไตรเทอร์ปีนซาโปนิน (triterpene saponin) ที่มีสูตรทางเคมี คือ C40H66O14 มีมวลโมเลกุล 806.98 g/mol และมีโครงสร้างโมเลกุล ซึ่งประกอบไปด้วยสารประกอบไตรเทอ พีนอยด์กรดไขมัน และสารคล้ายคลึงกับโมเลกุลของน้ำตาลกลูโคส ที่เรียกว่า glucuronic acid โดยโครงสร้างส่วนกลางของกรดจิมเนมิก ได้แก่ aglycone gymnemagenin ที่ประดับด้วยน้ำตาล glucuronic และกลุ่มเอสเทอร์ต่างๆ ซึ่งรูปแบบเหล่านี้จะทำให้เกิดกรดยิมเนมิกที่แตกต่างกัน ซึ่งรูปแบบของกรดจิมเนมิกนี้มีมากกว่า 20 รูปแบบ และจะแตกต่างกันไปตามสารประกอบทางเคมีภายในโครงสร้างโมเลกุลของชนิดนั้นๆ โดยสาร Gymnemic acid I (กรดจิมเนมิกที่พบในผักเชียงดา มีคุณสมบัติต้านความหวานสูงสุด',
  important_health_benefits: [
    'Block receptors in your intestines and thus sugar absorption, lowering your post-meal blood sugar levels',
    'Stimulate insulin production in your pancreas, promoting the regeneration of insulin-producing islet cells',
    'Reduce the production of substances linked to inflammation',
    'Improve cholesterol and triglyceride levels',
    'Block sweet receptors on taste buds'
  ],
  health_system_disease: [
    'Blood',
    'Diabetes',
    'Immunity',
    'LipidLevels',
    'Obesity'
  ],
  plants: [
    {
      common_name: 'ผักจินดา / ผักเชียงดา',
      part_of_studied: ['ใบ', 'ยอดอ่อน'],
      process: ['บดผง', 'สกัดด้วยน้ำ']
    }
  ],
  condition: 'ปริมาณผงผักเชียงดาบดผง ไม่เกิน 5 กรัมต่อวัน2.ต้องแสดงค้าเตือนบนฉลาก ดังนี้2.1 เด็ก สตรีมีครรภ์ และผู้ที่มีภาวะน้้าตาลในเลือดต่้าไม่ควรรับประทาน2.2 ผู้ป่วยโรคเบาหวาน ควรปรึกษาแพทย์ก่อนรับประทาน2.3 ไม่ควรรับประทานติดต่อกันเป็นเวลาเกิน 1 เดือน',
  fda: [
    {
      title: 'ประกาศ อ.ย. เรื่อง การใช้ส่วนประกอบสำคัญในผลิตภัณฑ์เสริมอาหาร วันที่ 26 มกราคา 2565',
      url: 'https://www.fda.moph.go.th/'
    }
  ],
  raw_material: {
    planting_source: [
      'กรดจิมเนมิกเป็นสารพฤกษเคมีที่ได้จากธรรมชาติ โดยแหล่งของสารชนิดนี้ในธรรมชาติ ได้แก่ ผักเชียงดา (Gymnema inodorum (Lour.) Decne) ซึ่งเป็นผักพื้นบ้านของภาคเหนือของประเทศไทย นอกจากนี้ยังสามารถพบกรดจิมานมิกได้ในผักเชียงดาอินเดีย ซึ่งเป็นพืชชนิดหนึ่งในประเทศอินเดียซึ่งเป็นพืชสกุล (genus) เดียวกันกับผักเชียงดา แต่ต่างชนิดกัน (species) คือ Gymnema sylvestre อีกด้วย'
    ],
    processing_plant: [
      'วิสาหกิจชุมชนชีววิถีตำบลน้ำเกี๋ยน – บริษัทชีววิถีเฮิร์บ จำกัด 192 ม. 4 ต.น้ำเกี๋ยน อ.ภูเพียง จ.น่าน - 130 ม. 4 ต.น้ำเกี๋ยน อ.ภูเพียง จ.น่าน 55000'
    ]
  },
  research: {
    professor: [
      'ผศ.ปริญญาวดี ศรีลานทิพย์และคณะ.ผักเชียงดาราชินีผักล้านนา. สถาบันถ่านทอดเทคโนโลยีสู่ชุมชน มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา 40 หน้า',
      'กนกพร อะทะวงมา.ฤทธิ์ลดน้ำตาลในเลือดของผักเชียงดา.บทความเผยแพร่ความรู้สู่ประชาชน.คณะเภสัชศาสตร์มหาวิทยาลัยมหิดล.',
      'ประทุมพร ยิ่งธงชัย และคณะ.การเปรียบเทียบคุณค่าทางโภชนาการและปริมาณสารออกฤทธิ์ชีวภาพในใบเชียงดา.วารสารเกษตรปีที่ 34. ฉบับที่ 3กันยายน-ธันวาคม 2561. หน้า 363-372'
    ],
    result: [
      'Shin-ichi Y, Toshiaki I, Michio M, Takeshi K, Ryuzo K, Yasutake H. Anti-diabetic effects of the extracts from the leaves of Gymnema sylvestre. Inhibitory effect of gymnemic acids on glucose absorption in the small intestine. Wakan Iyakugaku Zasshi (1996);13(4):300-3.',
      'Persaud, S.J., Al-Majed, H., Raman, A. and P.M. Jones. 1999. Gymnema sylvestre stimulates insulin release in vitro by increased membrane permeability. Journal of Endocrinology, 163: 207–212.',
      'Stoecklin W. Chemistry and physiological properties of gymnemic acid, the antisaccharine principle of the leaves of Gymnema sylvestre. J Agric Food Chem 1969;17(4):704-8.',
    ]
  }
}
// const herbDetail = {
//   name: 'กระเจี๊ยบแดง',
//   desc: 'ไม้ล้มลุก ลักษณะลำต้นเป็นทรงพุ่ม อายุปีเดียว สูงประมาณ 1 – 2 เมตร ขนาดลำต้นประมาณ 1 - 2 ซม.แตกกิ่งก้านมากมายตั้งแต่โคนต้น เปลือกต้นเรียบ ต้นอ่อนมีสีเขียว เมื่อแก่ลำต้นและกิ่งก้านสีแดงเข้มหรือสีแดงอมม่วง เปลือกลำต้นบางเรียบ สามารถลอกเป็นเส้นได้ ใบ เป็นใบเดี่ยว ออกเรียงสลับตามความสูงของกิ่ง ลักษณะใบรูปสี่เหลี่ยมข้าวหลามตัด ยาวประมาณ 7 - 13 ซม. มีขนปกคลุมทั้งด้านบนด้านล่าง ขอบใบเป็นแฉกคล้ายนิ้วมือ 3 นิ้ว หรือเป็น 5 แฉก ระยะห่างระหว่างแฉก 0.5 - 3 ซม. ลึกประมาณ 3 - 8 ซม. มีหูใบเป็นเส้นเรียวยาว 0.8 - 1.5 ซม. โคนใบสอบเรียว ปลายใบแหลมหรือเรียวแหลม โคนใบมน แต่ละแฉกมีรูปใบหอก ขอบใบเป็นจักฟันเลื่อย มีเส้นใบ 3 – 7 เส้น สีแดง ใบด้านล่างนูนเด่น โคนเส้นกลางใบด้านท้องใบมีต่อม 1 ต่อม แผ่นใบสีเขียวเกลี้ยง ก้านใบยาว 4 – 15 ซม. มีขนรูปดาวปกคลุม ใบที่มีอายุน้อย และใบใกล้ดอกจะมีขนาดเล็กรูปไข่ ดอกเป็นดอกเดี่ยว ดอกแทงออกตามซอกใบตั้งแต่โคนกิ่งถึงปลายกิ่ง ดอกมีก้านดอกสั้น สีแดงม่วง ดอกมีกลีบเลี้ยง ประมาณ 5 กลีบ หุ้มดอกบนสุด มีขนาดใหญ่ มีลักษณะอวบหนา มีสีแดงเข้มหุ้มดอก และกลีบรองดอก ที่เป็นกลีบด้านล่างสุด มีขนาดเล็ก 8 - 12 กลีบ มีสีแดงเข้ม กลีบทั้ง 2 ชนิดนี้ จะติดอยู่กับดอกจนถึงติดผล และผลแก่ ไม่มีร่วง ดอกเมื่อบานจะมีกลีบดอกสีเหลืองหรือสีชมพูอ่อนหรือสีขาวแกมชมพู บริเวณกลางดอกมีสีเข้ม ส่วนของดอกมีสีจางลง เมื่อดอกแก่กลีบดอกจะร่วง ทำให้กลีบรองดอก และกลีบเลี้ยงเจริญขึ้นมาหุ้ม เกสรเพศผู้จำนวนมาก ผล เจริญจากดอก เป็นผลแห้งแตกได้ ลักษณะรูปรีปลายแหลมหรือรูปไข่ ยาวประมาณ 2.5 ซม. มีจงอยสั้นๆ มีจีบตามยาว และถูกหุ้มด้วยกลีบเลี้ยงสีแดงเข้ม ติดทนขนาดใหญ่รองรับอยู่จนผลแก่ มีขนหยาบๆ สีเหลืองปกคลุม เมล็ด ส่วนในของเมล็ดรูปไตสีน้ำตาลเกลี้ยงจำนวนมาก',
//   title: 'ข้อมูลทั่วไป',
//   benefit: {
//     health_system_disease: [],
//     benefit: []
//   }
// }
const tabs = [
  {
    name: 'คุณประโยชน์',
    content: <div className='flex flex-col gap-4'>
      <Bagdes list={ingredient.health_system_disease} />
      <Lists list={ingredient.important_health_benefits} />
    </div>
  },
  {
    name: 'พืช',
    content: <Table
      head={
        <tr><th>ชื่อ</th><th>ส่วนที่ใช้</th><th>กรรมวิธี</th><th>เงื่อนไข</th></tr>
      }
      body={ingredient.plants.map((plant, index) => (
        <tr key={index} className='hover:bg-gray-100 text-left'>
          <th className='px-4 text-std py-1'>{ plant.common_name }</th>
          <th className='px-4 text-std py-1'>{ plant.part_of_studied.join(', ') }</th>
          <th className='px-4 text-std py-1'>{ plant.process.join(', ') }</th>
          <th rowSpan={ingredient.plants.length} className='w-[50%] px-4 text-std py-1'>{ ingredient.condition }</th>
        </tr>
      ))}
    />
  },
  {
    name: 'การรับรอง',
    content: <Lists link={true} list={ingredient.fda} />
  },
  {
    name: 'แหล่งวัตถุดิบ',
    content: <div className='flex flex-col gap-2'>
      <Lists title='แหล่งปลูก' list={ingredient.raw_material.planting_source} />
      <Lists title='โรงงานแปรรูป' list={ingredient.raw_material.processing_plant} />
    </div>
  },
  {
    name: 'งานวิจัย',
    content: <div className='flex flex-col gap-2'>
      <Lists title='ผู้เชี่ยวชาญ' list={ingredient.research.professor} />
      <Lists title='ผลงานวิจัย' list={ingredient.research.result} />
    </div>
  },
]
// const ingredient = ['phenolic acids', 'proanthocyanidns', 'flavonoid glycosides', 'myricetin']
function HerbDetail() {
  const { herbId } = useParams()
  return (
    <>
      <div className='flex md:flex-row flex-col gap-2'>
        <div className='md:w-3/4  flex flex-col gap-2 mx-4'>
          <p className="text-3xl font-bold text-gray-900 dark:text-white pl-4 mb-4">{ ingredient.functional_ingredient }</p>
          <CardDetail title='ข้อมูลทั่วไป' desc={ingredient.desc}></CardDetail>
          <Tab tabs={tabs} />
        </div>
        <div className='flex flex-col gap-4 md:w-1/4 p-4'>
          <div className=''>
            <InputIcon />
          </div>
          {/* <div className=''>zxcvx</div> */}
          <div className=''>
            {/* <Table
              head={
                <tr><th>สารออกฤทธิ์</th></tr>               
              }
              body={ingredient.map((ing, index) => (
                <tr key={index} className='hover:bg-gray-100 text-left'>
                  <th className='px-4 text-std py-1'>{ ing }</th>
                </tr>
              ))} /> */}
          </div>
          <div className='mt-2'>  
            <CardDetail
              title="ที่คล้ายกัน"
              desc={
                <div className='flex flex-col gap-2'>
                  <p className=''>Flavonoids</p>
                  <p className=''>Oleic acid</p>
                  <p className=''>Palmitoleic acid</p>
                </div>
              }
            />
          </div>
        </div>
      </div>
      {/* <div>
      </div> */}
    </>
  )
}

export default HerbDetail