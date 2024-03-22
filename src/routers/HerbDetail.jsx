import React, { useEffect, useState } from 'react'
import CardDetail from '../components/CardDetail'
import Table from '../components/Table'
import InputIcon from '../components/InputIcon'
import { Link, ScrollRestoration, useParams } from 'react-router-dom'
import Tab from '../components/Tab'
import Pic from '../components/Pic'
import Bagdes from '../components/Bagdes'
import Lists from '../components/Lists'
import IngredientDetail from '../components/IngredientDetail'
import api from '../middleware/api'
import ReactEcharts from "echarts-for-react"
import SmileDrawer from '../components/SmileDrawer'
import homeBg from '@/assets/bg/Home-bg.png'
import { SmiDrawer } from 'smiles-drawer'

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
const tabs = [
  { name: 'รูปส่วนผสมฟังค์ชัน' },
  { name: 'ข้อมูลทั่วไป' },
  { name: 'คุณประโยชน์' },
  { name: 'พืช' },
  { name: 'การรับรอง' },
  { name: 'แหล่งวัตถุดิบ' },
  { name: 'งานวิจัย' },
  { name: 'สารออกฤทธิ์ที่ใช้ร่วมกัน' }
]
const graphTemplateOption = (legend, data, links, categories) => {
  return {
    title: {
      text: null,
      subtext: null,
      top: 'bottom',
      left: 'right'
    },
    tooltip: {},
    legend: legend,
    animationDuration: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
      {
        name: null,
        type: 'graph',
        layout: 'circular',
        circular: {
          rotateLabel: true
        },
        data: data,
        links: links,
        categories: categories,
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
          // max: 4
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
  }
}
function HerbDetail() {
  const { herbId } = useParams()
  const [result, setResult] = useState(ingredient)
  const [chartOption, setChartOption] = useState({})
  const [graphOption, setGraphOption] = useState({})
  const [graphPlantOption, setGraphPlantOption] = useState({})

  const [isLoaded, setIsLoaded] = useState(false)

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
        // graphGenerate(json.results[0].health_system_disease.raw)
        handleGenGraph(json.results[0])
        // setOption
        setIsLoaded(true)
      })
    })
  }, [herbId])

  const transform = (result) => {
    setResult({
      ...result,
      functional_ingredient: result.functional_ingredient.raw,
      desc: result.description.raw,
      important_health_benefits: result.important_health_benefits.raw,
      health_system_disease: result.health_system_disease.raw,
      plants: result.plants.raw.map(p => {
        return JSON.parse(p)
        // const plantObj = JSON.parse(p)
        // return {
        //   common_name: {
        //     th: plantObj.common_name.th.join(', '),
        //     en: plantObj.common_name.en.join(', ')
        //   },
        //   part_of_studied: plantObj.production_process.part_of_studied.join(', '),
        //   process: plantObj.production_process.process.join(', ')
        // }
      }),
      condition: result.note.raw,
      fda: [],
      raw_material: JSON.parse(result.source.raw),
      research: JSON.parse(result.research.raw)
    })
  }
  const handleFetchHealthSystemDesease = (health_system_disease) => {
    api.post(`/api/as/v1/engines/${import.meta.env.VITE_ES_ENGINE}/search`, {
      query: '',
      filters: {
        health_system_disease: health_system_disease
      },
      page: { size: 300 }
      // sort: [
      //   { health_system_disease: 'asc' }
      // ]
    }, import.meta.env.VITE_ES_SEARCH_KEY).then((resp) => {
      resp.json().then((json) => {
        // console.log(json.results)
        const results = json.results
        const leg = {
          // selectedMode: 'single',
          data: [health_system_disease],
        }
        const data = [
          {
            label: { show: true },
            id: 0,
            name: health_system_disease,
            symbolSize: 50,
            value: results.length,
            category: 0
          },
          ...results.map((result, i) => {
            return {
              label: { show: true },
              id: i + 1,
              name: result.functional_ingredient.raw,
              symbolSize: 5,
              value: null,
              category: 0
            }
          })
        ]
        const links = results.map((result, i) => {
          return {
            source: i + 1,
            target: 0
          }
        })
        const categories = [{ name: health_system_disease }]
        setGraphOption(graphTemplateOption(leg, data, links, categories))
      })
    })
  }
  const handleGenGraph = (result) => {
    const benefit = {
      legend: {
        data: [result.functional_ingredient.raw]
      },
      data: [
        {
          label: { show: true },
          id: 0,
          name: result.functional_ingredient.raw,
          symbolSize: 50,
          value: result.health_system_disease.raw.length,
          category: 0
        },
        ...result.health_system_disease.raw.map((hsd, i) => {
          return {
            label: { show: true },
            id: i + 1,
            name: hsd,
            symbolSize: 10,
            value: null,
            category: 0
          }
        })
      ],
      links: result.health_system_disease.raw.map((hsd, i) => {
        return {
          source: i + 1,
          target: 0
        }
      }),
      categories: [{ name: result.functional_ingredient.raw }]
    }
    const plant = {
      legend: {
        data: [result.functional_ingredient.raw]
      },
      data: [
        {
          label: { show: true },
          id: 0,
          name: result.functional_ingredient.raw,
          symbolSize: 50,
          value: result.plants.raw.length,
          category: 0
        },
        ...result.plants.raw.map((plant, i) => {
          return {
            label: { show: true },
            id: i + 1,
            name: JSON.parse(plant).common_name.th.join(', '),
            symbolSize: 10,
            value: null,
            category: 0
          }
        })
      ],
      links: result.plants.raw.map((plant, i) => {
        return {
          source: i + 1,
          target: 0
        }
      }),
      categories: [{ name: result.functional_ingredient.raw }]

    }
    setGraphOption(graphTemplateOption(benefit.legend, benefit.data, benefit.links, benefit.categories))
    setGraphPlantOption(graphTemplateOption(plant.legend, plant.data, plant.links, plant.categories))
  }
  return (
    <>
      {/* {
      JSON.stringify(result)
    } */}
      {/* <IngredientDetail /> */}

      {/* ====================================================================== */}

      <div className="search-result-container detail">
        <div className="detail-container">

          <div className="path">
            <Link to={'/'}>
              <span>Home</span>
            </Link>
            <span>-</span>
            <span className='path-now'>{result.functional_ingredient}</span>
          </div>
        </div>

        <div className="name">
          <img src={homeBg} alt="" />
          <div className="title"><h1>{result.functional_ingredient}</h1></div>
        </div>

        <div className="detail-container content">
          <div className="max-width">
            <div className="box-a detail">
              <Tab tabs={tabs} />

            </div>
            <div className="box-b" id='one'>
              <section id='รูปส่วนผสมฟังค์ชัน'>
                <div className="result-card detail-page first" >
                  <div className="top-info">
                    <h2>รูปส่วนผสมฟังค์ชัน</h2>
                  </div>
                  <div>
                    <Pic pics={[
                      {
                        name: 'รูปส่วนผสมฟังค์ชัน',
                        content: <div className="img-show">
                          {/* <img src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Gymnemic-acids.svg" alt="" /> */}
                          {/* {JSON.stringify(result.chem_formula.raw)} */}
                          {
                            isLoaded && <SmileDrawer smilesStr={result.chem_formula?.raw} />
                          }
                        </div>
                      },
                      {
                        name: 'รูปความสัมพันธ์',
                        content: <CardDetail desc={
                          <ReactEcharts style={{ borderStyle: 'solid', height: '300px' }} option={graphPlantOption} />
                        } />
                      }
                    ]
                    } />

                  </div>
                </div>
              </section>


              <section id='ข้อมูลทั่วไป'>
                <div className="result-card detail-page" id='two'>
                  <div className="top-info">
                    <h2>ข้อมูลทั่วไป</h2>
                  </div>
                  <div className="info-info">
                    <p className='general-info'>{result.desc}</p>
                  </div>
                </div>
              </section>

              <section id='คุณประโยชน์'>
                <div className="result-card detail-page" id='three'>
                  <div className="top-info">
                    <h2>คุณประโยชน์</h2>
                  </div>
                  <div className="test-2">
                    <Bagdes list={result.health_system_disease} />
                  </div>

                  <div className="info-info">

                    <Lists list={result.important_health_benefits} />
                  </div>
                </div>
              </section>

              <section id='พืช'>
                <div className="result-card detail-page" id='four'>
                  <div className="top-info">
                    <h2>พืช</h2>
                  </div>
                  <div className="info-info table">

                    <table className='plant-table'>
                      <thead>
                        <tr>
                          <th>ชื่อ</th>
                          <th>ส่วนที่ใช้</th>
                          <th>กรรมวิธี</th>
                          <th>เงื่อนไข</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.plants?.map((plant, index) => (
                          <tr key={index} className='hover:bg-gray-100 text-left'>
                            <td>{plant.common_name.th}</td>
                            <td>{plant.part_of_studied}</td>
                            <td>{plant.process || '-'}</td>
                            {
                              index === 0 && <td rowSpan={result.plants?.length} className='px-4 text-std py-1'>{result.condition || '-'}</td>
                            }
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              <section id='การรับรอง'>
                <div className="result-card detail-page" id='five'>
                  <div className="top-info">
                    <h2>การรับรอง</h2>
                  </div>
                  <div className="info-info">

                    <Lists link={true} list={result.fda} />
                  </div>
                </div>
              </section>

              <section id='แหล่งวัตถุดิบ'>
                <div className="result-card detail-page" id='six'>
                  <div className="top-info">
                    <h2>แหล่งวัตถุดิบ</h2>
                  </div>
                  <div className="plant-base">
                    <div className="info-info colum">
                      <span className='header'>แหล่งเพาะปลูก :</span>
                      <Lists list={result.raw_material.planting} />
                    </div>
                    <div className="info-info colum">
                      <span className='header'>โรงงานแปรรูป :</span>
                      <Lists list={result.raw_material.factory} />
                    </div>
                  </div>
                </div>
              </section>

              <section id='งานวิจัย'>
                <div className="result-card detail-page" id='seven'>
                  <div className="top-info">
                    <h2>งานวิจัย</h2>
                  </div>
                  <div className="plant-base">
                    <div className="info-info colum">

                      <span className='header'>ผู้เชี่ยวชาญ :</span>
                      <Lists list={result.research.expert} />
                    </div>
                    <div className="info-info colum">
                      <span className='header'>ผลการวิจัย :</span>
                      <Lists list={result.research.research} />
                    </div>
                  </div>
                </div>
              </section>

              <section id='สารออกฤทธิ์ที่ใช้ร่วมกัน'>
                <div className="result-card detail-page" id='eight'>
                  <div className="top-info">
                    <h2>สารออกฤทธิ์ที่ใช้ร่วมกัน</h2>
                  </div>
                  <div className="info-info link">
                    <ul>
                      <li>
                        <Link to={{ pathname: `/herb/doc-65439aaaafdb52f7d0b6397c` }} >
                          {/* <button type="submit" className="tw-button-submit  right-2 bottom-2 font-medium rounded-full text-sm px-4 py-2">{result.functional_ingredient.raw}</button> */}
                          <span>Gymnema sylvestre</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={{ pathname: `/herb/doc-65439aaaafdb52f7d0b6393a` }} >
                          <span>Oleic acid</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={{ pathname: `/herb/doc-65439aaaafdb52f7d0b63945` }} >
                          <span>Triterpene glycosides</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

            </div>

          </div>
        </div>

      </div>
      <div className="white-bg-cont">
        <div className="test">
          <div className="slide-container white-bg">
            <div className="header">
              <span>ผลลัพธ์ที่คล้ายกัน</span>
              <a href="/">แสดงทั้งหมด</a>
            </div>

            <div className="slide-card">


              <Link to={{ pathname: `/herb/doc-65439aaaafdb52f7d0b63930` }} className="item-card">
                <span className='title'>Flavonoids</span>
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Gymnemic-acids.svg" alt="" />
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, rerum tempore ut cupiditate eum culpa facere totam voluptate minima sit ipsa corporis quod laboriosam nobis distinctio aspernatur voluptates assumenda consectetur?</p>
                <div className='icon'><i className="fa-solid fa-magnifying-glass"></i></div>
              </Link>

              <Link to={{ pathname: `/herb/doc-65439aaaafdb52f7d0b6393a` }} className="item-card">
                <span className='title'>Oleic acid</span>
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Gymnemic-acids.svg" alt="" />
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, rerum tempore ut cupiditate eum culpa facere totam voluptate minima sit ipsa corporis quod laboriosam nobis distinctio aspernatur voluptates assumenda consectetur?</p>
                <div className='icon'><i className="fa-solid fa-magnifying-glass"></i></div>
              </Link>

              <Link to={{ pathname: `/herb/doc-65439aaaafdb52f7d0b6397d` }} className="item-card">
                <span className='title'>Palmitoleic acid</span>
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Gymnemic-acids.svg" alt="" />
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, rerum tempore ut cupiditate eum culpa facere totam voluptate minima sit ipsa corporis quod laboriosam nobis distinctio aspernatur voluptates assumenda consectetur?</p>
                <div className='icon'><i className="fa-solid fa-magnifying-glass"></i></div>
              </Link>


            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default HerbDetail