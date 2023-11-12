import HerbCard from '../components/HerbCard'
import { Link, useLocation, useParams } from 'react-router-dom'
import Pagination from '../components/Pagination'
import SearchKeyword from '../components/SearchKeyword'
import { useMemo } from 'react'
// import { Result, Results, SearchBox, SearchProvider, WithSearch } from '@elastic/react-search-ui'
import { Facet, Paging, PagingInfo, Results, ResultsPerPage, SearchBox, SearchProvider, WithSearch } from '@elastic/react-search-ui'
import { ErrorBoundary } from '@elastic/react-search-ui-views'
import es_config from '../middleware/elasticsearch_demo'
import { Layout } from '@elastic/react-search-ui-views'

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
  const queryString = new URLSearchParams(search).get('q')
  return (
    <div className='flex flex-col gap-4 sm:px-2 md:px-4 lg:px-8 xl:px-12'>
      <SearchKeyword keyword={queryString} />
      {/* {herbs.map((herb, index) => (
        <Link to={`${location.pathname}/${herb.title.name}`} key={index}>
          <HerbCard herb={herb}></HerbCard>
        </Link>
      ))}
      <div className='flex flex-col items-center'>
        <Pagination />
      </div> */}
      <SearchProvider config={es_config}>
        <WithSearch mapContextToProps={({ isLoading }) => ({ isLoading })}>
          {({ isLoading }) => (
            <>
              {isLoading && <div>I'm loading now</div>}
              {!isLoading &&
                <ErrorBoundary>
                  <div className='flex flex-col items-center gap-0'>
                    {/* <SearchBox inputProps={{ placeholder: "custom placeholder" }} /> */}
                    {/* <SearchBox autocompleteSuggestions={true} view={({ value, onChange, onSubmit, useAutocomplete, autocompletedResults }) => (
                      <>
                        <div className="relative w-1/3">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                          </div>
                          <form onSubmit={onSubmit}>
                            <input
                              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                              type="text"
                              value={value}
                              onChange={(e) => onChange(e.target.value)}
                            />
                            <button type="submit" className="tw-button-submit absolute right-2 bottom-2 font-medium rounded-full text-sm px-4 py-2">ค้นหา</button>
                          </form>
                        </div>
                        <div>{JSON.stringify(autocompletedResults)}</div>
                      </>
                    )}/> */}
                    <div className='mt-4 flex flex-row gap-4 w-full'>
                      <div className='rounded-lg w-1/5'>
                        <Facet
                          field="group_of_functional_ingredient"
                          label="Group of Functional Ingredient"
                          // isFilterable={true}
                        />
                      </div>
                      <div className='flex flex-col items-center bg-orange-0 w-full gap-2'>
                        <div className='w-full flex items-center justify-between'>
                          <PagingInfo view={({ start, end, totalResults }) => (
                            <p className='text-sm'>Showing <strong>{start} - {end}</strong> out of <strong>{totalResults}</strong></p>
                          )} />
                          <ResultsPerPage view={({ onChange, value }) => (
                            <div>
                              <select value={value} onChange={(e) => onChange(parseInt(e.target.value))} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                {[10, 20, 30, 40, 50].map((v, index) => (
                                  <option disabled={v === value} key={index} value={v}>{v}</option>
                                ))}
                              </select>
                            </div>
                          )} />
                        </div>
                        <div className='w-full'>
                          <Results
                            resultView={({ result, onClickLink }) => (
                              <>
                                {/* { JSON.stringify(result) } */}
                                {result.id?.raw &&
                                  <div className='w-full mb-4 p-4 flex lg:flex-row flex-col gap-8 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
                                    <div className="flex-1 flex flex-col">
                                      <Link to={{ pathname: `/herb/${result.id.raw}` }} >
                                        <button type="submit" className="tw-button-submit  right-2 bottom-2 font-medium rounded-full text-sm px-4 py-2">{result.functional_ingredient.raw}</button>
                                      </Link>
                                      <p className="mt-2 text-gray-700 dark:text-gray-400" dangerouslySetInnerHTML={{ __html: (result.description.snippet) }} ></p>
                                    </div>
                                  </div>
                                }
                              </>
                            )}
                          // titleField="title"
                          // urlField="nps_link"
                          // thumbnailField="image_url"
                          // shouldTrackClickThrough
                          />
                        </div>
                        <Paging />
                      </div>
                    </div>
                  </div>
                </ErrorBoundary>
              }
            </>
          )}
        </WithSearch>
      </SearchProvider>
    </div>
  )
}

export default Herb