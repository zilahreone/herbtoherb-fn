import React, { useEffect, useState } from 'react'
import CardDetail from '../components/CardDetail'
import Table from '../components/Table'
import InputIcon from '../components/InputIcon'
import { Link, ScrollRestoration, useParams } from 'react-router-dom'
import Tab from '../components/Tab'
import Bagdes from '../components/Bagdes'
import Lists from '../components/Lists'
import IngredientDetail from '../components/IngredientDetail'
import api from '../middleware/api'
import ReactEcharts from "echarts-for-react"
import homeBg from '@/assets/bg/Home-bg.png'
import testPic from '@/assets/test-pic2.png'



const ingredient = {
  functional_ingredient: null,
  desc: null,
  important_health_benefits: [],
  health_system_disease: [],
  plants: [],
  condition: null,
  fda: [
    {
      title: null,
      url: null
    }
  ],
  raw_material: {
    planting: [],
    factory: []
  },
  research: {
    expert: [],
    research: []
  }
}
function HerbDetail() {
  const { herbId } = useParams()
  const [result, setResult] = useState(ingredient)
  const [chartOption, setChartOption] = useState({})

  useEffect(() => {
    // console.log(herbId);
    api.post(`/api/as/v1/engines/${import.meta.env.VITE_ES_ENGINE}/search`, {
      query: '',
      filters: {
        id: [herbId]
      }
    }, import.meta.env.VITE_ES_SEARCH_KEY).then((resp) => {
      resp.json().then((json) => {
        // console.log((json.results[0]))
        transform(json.results[0])
        graphGenerate(json.results[0].health_system_disease.raw)
        // setOption
      })
    })
  }, [herbId])
  const transform = (result) => {
    setResult({
      functional_ingredient: result.functional_ingredient.raw,
      desc: result.description.raw,
      important_health_benefits: result.important_health_benefits.raw,
      health_system_disease: result.health_system_disease.raw,
      plants: result.plants.raw.map(p => {
        const plantObj = JSON.parse(p)
        return {
          common_name: {
            th: plantObj.common_name.th.join(', '),
            en: plantObj.common_name.en.join(', ')
          },
          part_of_studied: plantObj.production_process.part_of_studied.join(', '),
          process: plantObj.production_process.process.join(', ')
        }
      }),
      condition: result.note.raw,
      fda: [],
      raw_material: JSON.parse(result.source.raw),
      research: JSON.parse(result.research.raw)
    })
  }
  const graphGenerate = (health_system_disease) => {
    api.post(`/api/as/v1/engines/${import.meta.env.VITE_ES_ENGINE}/search`, {
      query: '',
      filters: {
        health_system_disease: health_system_disease
      }
    }, import.meta.env.VITE_ES_SEARCH_KEY).then((resp) => {
      resp.json().then((json) => {
        // console.log(json.results.map((r, i) => r))
        let linkArr = []
        json.results.forEach((r, i) => {
          r.health_system_disease.raw.forEach((hsd) => {
            // console.log(hsd);
            // console.log(health_system_disease.includes(hsd));
            // console.log(health_system_disease.indexOf(hsd))
            if (health_system_disease.includes(hsd)) {
              linkArr.push({
                source: health_system_disease.length + i,
                target: health_system_disease.indexOf(hsd)
              })
            }
          })
          // console.log('===========');
        })
        // console.log(linkArr)
        const series = {
          nodes: [
            ...health_system_disease.map((hsd, i) => {
              return {
                label: { show: true },
                id: i,
                name: hsd,
                symbolSize: (linkArr.filter(l => l.target === i).length / linkArr.length) * 100,
                x: -1000,
                y: 100 + (i * 150),
                value: linkArr.filter(l => l.target === i).length,
                category: i
              }
            }),
            ...json.results.map((r, i) => {
            return {
              label: { show: true },
              id: health_system_disease.length + i,
              name: r.functional_ingredient.raw,
              symbolSize: 20,
              x: 200,
              y: 0 + (i * 100),
              value: '',
              category: health_system_disease.length + i
            }
          })],
          links: linkArr,
          categories: [
            ...health_system_disease.map(hsd => { return { name: hsd } }),
            ...json.results.map((r) => { return { name: r.functional_ingredient.raw }})
          ]
        }
        // console.log(series);
        setChartOption({
          title: {
            text: null,
            subtext: null,
            top: 'bottom',
            left: 'right'
          },
          tooltip: {},
          legend: [
            {
              // selectedMode: 'single',
              data: [
                ...health_system_disease,
                ...json.results.map(r => r.functional_ingredient.raw)
              ]
            }
          ],
          animationDuration: 1500,
          animationEasingUpdate: 'quinticInOut',
          series: [
            {
              name: null,
              type: 'graph',
              layout: 'none',
              data: series.nodes,
              links: series.links,
              categories: series.categories,
              roam: true,
              label: {
                position: 'right',
                formatter: '{b}'
              },
              labelLayout: {
                hideOverlap: true
              },
              scaleLimit: {
                min: 0.4,
                max: 2
              },
              lineStyle: {
                color: 'source',
                curveness: 0.3
              },
              emphasis: {
                focus: 'adjacency',
                lineStyle: {
                  width: 10
                }
              }
            }
          ]
        })
      })
    })
  }
  return (
    <>
      {/* {
      JSON.stringify(result)
    } */}
      {/* <IngredientDetail /> */}
      <div className='flex md:flex-row flex-col gap-2 hide'>
        <div className='md:w-3/4  flex flex-col gap-2 mx-4'>
          <p className="text-3xl font-bold text-gray-900 dark:text-white pl-4 mb-4">{result.functional_ingredient}</p>
          <CardDetail title='ข้อมูลทั่วไป' desc={result.desc} />
          <CardDetail title='ที่เกี่ยวข้อง'
            desc={
              <ReactEcharts style={{ height: '600px', borderStyle: 'solid' }} option={chartOption} />
            }
          />
          <Tab tabs={[
            {
              name: 'คุณประโยชน์',
              content: <div className='flex flex-col gap-4'>
                <Bagdes list={result.health_system_disease} />
                <Lists list={result.important_health_benefits} />
              </div>
            },
            {
              name: 'พืช',
              content: <Table
                head={
                  <tr><th className='px-4'>ชื่อ</th><th className='px-4'>ส่วนที่ใช้</th><th className='px-4'>กรรมวิธี</th><th className='px-4'>เงื่อนไข</th></tr>
                }
                body={result.plants?.map((plant, index) => (
                  <tr key={index} className='hover:bg-gray-100 text-left'>
                    <td className='px-4 text-std py-1'>{plant.common_name.th}</td>
                    <td className='px-4 text-std py-1'>{plant.part_of_studied}</td>
                    <td className='px-4 text-std py-1'>{plant.process || '-'}</td>
                    {
                      index === 0 && <td rowSpan={result.plants?.length} className='px-4 text-std py-1'>{result.condition || '-'}</td>
                    }
                  </tr>
                ))}
              />
            },
            {
              name: 'การรับรอง',
              content: <Lists link={true} list={result.fda} />
            },
            {
              name: 'แหล่งวัตถุดิบ',
              content: <div className='flex flex-col gap-2'>
                <Lists title='แหล่งปลูก' list={result.raw_material.planting} />
                <Lists title='โรงงานแปรรูป' list={result.raw_material.factory} />
              </div>
            },
            {
              name: 'งานวิจัย',
              content: <div className='flex flex-col gap-2'>
                <Lists title='ผู้เชี่ยวชาญ' list={result.research.expert} />
                <Lists title='ผลงานวิจัย' list={result.research.research} />
              </div>
            }
          ]
          } />
        </div>
        <div className='flex flex-col gap-4 md:w-1/4 p-4'>
          {/* <div className=''>
            <InputIcon />
          </div> */}
          <div className=''>
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Gymnemic-acids.svg" alt="" />
          </div>
          <div className='mt-4'>
            {/* <Table
              head={
                <tr><th className='py-1'>สารออกฤทธิ์ที่ใช้ร่วมกัน</th></tr>
              }
              body={
                <>
                <tr className='hover:bg-gray-100 text-left'>
                  <td className='px-4 text-std py-1'>Gymnema sylvestre</td>
                </tr>
                <tr className='hover:bg-gray-100 text-left'>
                  <td className='px-4 text-std py-1'>Oleic acid</td>
                </tr>
                <tr className='hover:bg-gray-100 text-left'>
                  <td className='px-4 text-std py-1'>Triterpene glycosides</td>
                </tr>
                </>
              }
            /> */}
            <CardDetail
              title="สารออกฤทธิ์ที่ใช้ร่วมกัน"
              desc={
                <div className='flex flex-col gap-2'>
                  <Link to={{ pathname: `/herb/doc-65439aaaafdb52f7d0b6397c` }} >
                    {/* <button type="submit" className="tw-button-submit  right-2 bottom-2 font-medium rounded-full text-sm px-4 py-2">{result.functional_ingredient.raw}</button> */}
                    <p className=''>Gymnema sylvestre</p>
                  </Link>
                  <Link to={{ pathname: `/herb/doc-65439aaaafdb52f7d0b6393a` }} >
                    <p className=''>Oleic acid</p>
                  </Link>
                  <Link to={{ pathname: `/herb/doc-65439aaaafdb52f7d0b63945` }} >
                    <p className=''>Triterpene glycosides</p>
                  </Link>
                </div>
              }
            />
          </div>
          <div className=''>
            <CardDetail
              title="ที่คล้ายกัน"
              desc={
                <div className='flex flex-col gap-2'>
                  <Link to={{ pathname: `/herb/doc-65439aaaafdb52f7d0b63930` }} >
                    {/* <button type="submit" className="tw-button-submit  right-2 bottom-2 font-medium rounded-full text-sm px-4 py-2">{result.functional_ingredient.raw}</button> */}
                    <p className=''>Flavonoids</p>
                  </Link>
                  <Link to={{ pathname: `/herb/doc-65439aaaafdb52f7d0b6393a` }} >
                    <p className=''>Oleic acid</p>
                  </Link>
                  <Link to={{ pathname: `/herb/doc-65439aaaafdb52f7d0b6397d` }} >
                    <p className=''>Palmitoleic acid</p>
                  </Link>
                </div>
              }
            />
          </div>
        </div>
      </div>


      <div className="search-result-container detail">
        <div className="detail-container">

          <div className="path">
            <span>Home</span>
            <span>-</span>
            <span>เกล็ดเลือดต่ำ</span>
            <span>-</span>
            <span className='path-now'>โปรตีน</span>
          </div>
        </div>

        <div className="name">
          <img src={homeBg} alt="" />
          <div className="title"><h1>โปรตีน (Protein)</h1></div>
        </div>

        <div className="detail-container content">
          <div className="max-width">
            <div className="box-a detail">
              <div className="sidebar-menu">
                <button>รูปส่วนผสมฟังค์ชัน</button>
                <button className='menu-active'>ข้อมูลทั่วไป</button>
                <button>คุณประโยชน์</button>
                <button>พืช</button>
                <button>การรับรอง</button>
                <button>แหล่งวัตถุดิบ</button>
                <button>งานวิจัย</button>
              </div>
            </div>
            <div className="box-b">

              <div className="result-card detail-page first">
                <div className="top-info">
                  <h2>รูปส่วนผสมฟังค์ชัน</h2>
                </div>
                <div className="info-info">
                  <div className="pic-choice">
                    <span>เลือกการแสดงผล :</span>
                    <div className='btn'>
                      <button className='active'>รูปที่ 1</button>
                      <button>รูปที่ 2</button>
                      <button>รูปที่ 3</button>
                    </div>
                  </div>
                  <div className="img-show">
                    <img src={testPic} alt="" />
                  </div>
                </div>
              </div>
              
              <div className="result-card detail-page">
                <div className="top-info">
                  <h2>ข้อมูลทั่วไป</h2>
                </div>
                <div className="info-info">
                <p className='general-info'>Carbohydrate & Specialty carbohydrates, Trigonella-foenumgraecum L., ลูกซัด, Fenugreek, Digestive, LipidLevels, Blood, ปริมาณใยอาหาร ไม่เกิน 25 กรัมต่อวัน</p>
                </div>
              </div>

              <div className="result-card detail-page">
                <div className="top-info">
                  <h2>คุณประโยชน์</h2>
                </div>
                <div className="info-info">
                  <ul>
                    <li>Improves digestive health (Reflux)</li>
                    <li>Reduce LDL and triglycerides</li>
                    <li>Regulates blood sugar level</li>
                  </ul>
                </div>
              </div>

              <div className="result-card detail-page">
                <div className="top-info">
                  <h2>พืช</h2>
                </div>
                <div className="info-info">
                  <table className='plant-table'>
                    <tr>
                      <th>ชื่อ</th>
                      <th>ส่วนที่ใช้</th>
                      <th>กรรมวิธี</th>
                      <th>เงื่อนไข</th>
                    </tr>
                    <tr>
                      <td>ข้าว</td>
                      <td>-</td>
                      <td>-</td>
                      <td>ปริมาณโพลิโคซานอล ไม่เกิน 5 มิลลิกรัมต่อวัน</td>
                    </tr>
                    <tr>
                      <td>อ้อย</td>
                      <td>-</td>
                      <td>-</td>
                      <td>ปริมาณโพลิโคซานอล ไม่เกิน 5 มิลลิกรัมต่อวัน</td>
                    </tr>
                    <tr>
                      <td>ข้าว</td>
                      <td>-</td>
                      <td>-</td>
                      <td>ปริมาณโพลิโคซานอล ไม่เกิน 5 มิลลิกรัมต่อวัน</td>
                    </tr>
                  </table>
                </div>
              </div>

              <div className="result-card detail-page">
                <div className="top-info">
                  <h2>การรับรอง</h2>
                </div>
                <div className="info-info">
                <p className='general-info'>ไม่มีข้อมูล</p>
                </div>
              </div>

              <div className="result-card detail-page">
                <div className="top-info">
                  <h2>แหล่งวัตถุดิบ</h2>
                </div>
                <div className="plant-base">
                  <div className="info-info colum">
                    <span className='header'>แหล่งเพาะปลูก :</span>
                    <ul>
                      <li>บ้านเลขที่ 259 หมู่ 9 หมู่บ้าน ร่องครกใต้ ถ.จำป่าหวาย-แม่กา ต.จำป่าหวาย อ.เมืองพะเยา จ.พะเยา</li>
                      <li>บ้านเลขที่ 59/5 หมู่ 4 บ้านท่าต้นกวาว ถนนสันกอละหก ตำบลชมภู อำเภอสารภี จังหวัดเชียงใหม่</li>
                    </ul>
                  </div>
                  <div className="info-info colum">
                    <span className='header'>โรงงานแปรรูป :</span>
                    <ul>
                      <li>วิสาหกิจชุมชนชีววิถีตำบลน้ำเกี๋ยน – บริษัทชีววิถีเฮิร์บ จำกัด 192 ม. 4 ต.น้ำเกี๋ยน อ.ภูเพียง จ.น่าน - 130 ม. 4 ต.น้ำเกี๋ยน อ.ภูเพียง จ.น่าน 55000</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="result-card detail-page">
                <div className="top-info">
                  <h2>งานวิจัย</h2>
                </div>
                <div className="plant-base">
                  <div className="info-info colum">
                    <span className='header'>ผู้เชี่ยวชาญ :</span>
                    <ul>
                      <li>ผศ.ปริญญาวดี ศรีลานทิพย์และคณะ.ผักเชียงดาราชินีผักล้านนา. สถาบันถ่านทอดเทคโนโลยีสู่ชุมชน มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา 40 หน้า</li>
                      <li>กนกพร อะทะวงมา.ฤทธิ์ลดน้ำตาลในเลือดของผักเชียงดา.บทความเผยแพร่ความรู้สู่ประชาชน.คณะเภสัชศาสตร์มหาวิทยาลัยมหิดล.</li>
                      <li>ประทุมพร ยิ่งธงชัย และคณะ.การเปรียบเทียบคุณค่าทางโภชนาการและปริมาณสารออกฤทธิ์ชีวภาพในใบเชียงดา.วารสารเกษตรปีที่ 34. ฉบับที่ 3กันยายน-ธันวาคม 2561. หน้า 363-372</li>
                    </ul>
                  </div>
                  <div className="info-info colum">
                    <span className='header'>ผลการวิจัย :</span>
                    <ul>
                      <li>Shin-ichi Y, Toshiaki I, Michio M, Takeshi K, Ryuzo K, Yasutake H. Anti-diabetic effects of the extracts from the leaves of Gymnema sylvestre. Inhibitory effect of gymnemic acids on glucose absorption in the small intestine. Wakan Iyakugaku Zasshi (1996);13(4):300-3.</li>
                      <li>Persaud, S.J., Al-Majed, H., Raman, A. and P.M. Jones. 1999. Gymnema sylvestre stimulates insulin release in vitro by increased membrane permeability. Journal of Endocrinology, 163: 207–212.</li>
                      <li>Stoecklin W. Chemistry and physiological properties of gymnemic acid, the antisaccharine principle of the leaves of Gymnema sylvestre. J Agric Food Chem 1969;17(4):704-8.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="result-card detail-page">
                <div className="top-info">
                  <h2>สารออกฤทธิ์ที่ใช้ร่วมกัน</h2>
                </div>
                <div className="info-info">
                  <ul>
                    <li>Gymnema sylvestre</li>
                    <li>Oleic acid</li>
                    <li>Triterpene glycosides</li>
                  </ul>
                </div>
              </div>

            </div>



          </div>          
        </div>
        
      </div>
      <div className="white-bg-cont">
        <div className="test">
          <div className="slide-container white-bg">
              <div className="header">
                <span>ผลลัพธ์ที่คล้ายกัน</span>
                <a href="">แสดงทั้งหมด</a>
              </div>
              <div className="slide-card">

                <div className="item-card">
                  <span className='title'>อัลบูมิน (Albumin)</span>
                  <img src={testPic} alt="" />
                  <p>Protein & Amino acids, Irvingia gabonensis, เมล็ดมะม่วงแอฟริกัน, African mango, BloodPressure, Digestive, Immunity, ปริมาณสารสกัดไม่เกิน 300 มิลลิกรัมต่อวัน2. ต้องแสดงข้อความค้าเตือนบนฉลากดังนี้ “ข้อมูลส้าหรับผู้แพ้อาหาร : มีอัลบูมินจากสารสกัดเมล็ดมะม่วงแอฟริกัน”</p>
                  <div className='icon'><i class="fa-solid fa-magnifying-glass"></i></div>
                </div>

                <div className="item-card">
                  <span className='title'>อัลบูมิน (Albumin)</span>
                  <img src={testPic} alt="" />
                  <p>Protein & Amino acids, Irvingia gabonensis, เมล็ดมะม่วงแอฟริกัน, African mango, BloodPressure, Digestive, Immunity, ปริมาณสารสกัดไม่เกิน 300 มิลลิกรัมต่อวัน2. ต้องแสดงข้อความค้าเตือนบนฉลากดังนี้ “ข้อมูลส้าหรับผู้แพ้อาหาร : มีอัลบูมินจากสารสกัดเมล็ดมะม่วงแอฟริกัน”</p>
                  <div className='icon'><i class="fa-solid fa-magnifying-glass"></i></div>
                </div>

                <div className="item-card">
                  <span className='title'>อัลบูมิน (Albumin)</span>
                  <img src={testPic} alt="" />
                  <p>Protein & Amino acids, Irvingia gabonensis, เมล็ดมะม่วงแอฟริกัน, African mango, BloodPressure, Digestive, Immunity, ปริมาณสารสกัดไม่เกิน 300 มิลลิกรัมต่อวัน2. ต้องแสดงข้อความค้าเตือนบนฉลากดังนี้ “ข้อมูลส้าหรับผู้แพ้อาหาร : มีอัลบูมินจากสารสกัดเมล็ดมะม่วงแอฟริกัน”</p>
                  <div className='icon'><i class="fa-solid fa-magnifying-glass"></i></div>
                </div>

                <div className="item-card">
                  <span className='title'>อัลบูมิน (Albumin)</span>
                  <img src={testPic} alt="" />
                  <p>Protein & Amino acids, Irvingia gabonensis, เมล็ดมะม่วงแอฟริกัน, African mango, BloodPressure, Digestive, Immunity, ปริมาณสารสกัดไม่เกิน 300 มิลลิกรัมต่อวัน2. ต้องแสดงข้อความค้าเตือนบนฉลากดังนี้ “ข้อมูลส้าหรับผู้แพ้อาหาร : มีอัลบูมินจากสารสกัดเมล็ดมะม่วงแอฟริกัน”</p>
                  <div className='icon'><i class="fa-solid fa-magnifying-glass"></i></div>
                </div>

                <div className="item-card">
                  <span className='title'>อัลบูมิน (Albumin)</span>
                  <img src={testPic} alt="" />
                  <p>Protein & Amino acids, Irvingia gabonensis, เมล็ดมะม่วงแอฟริกัน, African mango, BloodPressure, Digestive, Immunity, ปริมาณสารสกัดไม่เกิน 300 มิลลิกรัมต่อวัน2. ต้องแสดงข้อความค้าเตือนบนฉลากดังนี้ “ข้อมูลส้าหรับผู้แพ้อาหาร : มีอัลบูมินจากสารสกัดเมล็ดมะม่วงแอฟริกัน”</p>
                  <div className='icon'><i class="fa-solid fa-magnifying-glass"></i></div>
                </div>

                <div className="item-card">
                  <span className='title'>อัลบูมิน (Albumin)</span>
                  <img src={testPic} alt="" />
                  <p>Protein & Amino acids, Irvingia gabonensis, เมล็ดมะม่วงแอฟริกัน, African mango, BloodPressure, Digestive, Immunity, ปริมาณสารสกัดไม่เกิน 300 มิลลิกรัมต่อวัน2. ต้องแสดงข้อความค้าเตือนบนฉลากดังนี้ “ข้อมูลส้าหรับผู้แพ้อาหาร : มีอัลบูมินจากสารสกัดเมล็ดมะม่วงแอฟริกัน”</p>
                  <div className='icon'><i class="fa-solid fa-magnifying-glass"></i></div>
                </div>



              </div>
            </div>
          </div>

          </div>



    </>
  )
}

export default HerbDetail