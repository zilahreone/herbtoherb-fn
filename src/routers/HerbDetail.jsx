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
  const graphGenerate = (health_system_disease) => {
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
        // console.log(json.results.map(r => r.health_system_disease.raw));
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
                // x: -1000,
                // y: 100 + (i * 250),
                value: linkArr.filter(l => l.target === i).length,
                category: i
              }
            }),
            ...json.results.map((r, i) => {
              // return r.health_system_disease.raw.map((hsd_s) => {
              //   if (health_system_disease.indexOf(hsd_s) >= 0) {
              //     return {
              //       label: { show: false },
              //       id: health_system_disease.length + i,
              //       name: r.functional_ingredient.raw,
              //       symbolSize: 5,
              //       // x: 200,
              //       // y: 0 + (i * 100),
              //       value: null,
              //       category: health_system_disease.indexOf(hsd_s)
              //     }
              //   }
              // })
              return {
                label: { show: false },
                id: health_system_disease.length + i,
                name: r.functional_ingredient.raw,
                symbolSize: 5,
                // x: 200,
                // y: 0 + (i * 100),
                value: null,
                category: r.health_system_disease.raw.findIndex((hsd) => health_system_disease.includes(hsd))
                // category: 2
              }
            })
          ],
          links: linkArr,
          categories: [
            ...health_system_disease.map(hsd => { return { name: hsd } }),
            // ...json.results.map((r) => { return { name: r.functional_ingredient.raw }})
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
                // ...json.results.map(r => r.functional_ingredient.raw)
              ]
            }
          ],
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
                min: 0.6,
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
        })
      })
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
  const handleFetchPlant = (plant) => {
    api.post(`/api/as/v1/engines/${import.meta.env.VITE_ES_ENGINE}/search`, {
      query: '',
      filters: {
        plants: plant
      },
      page: { size: 300 }
      // sort: [
      //   { health_system_disease: 'asc' }
      // ]
    }, import.meta.env.VITE_ES_SEARCH_KEY).then((resp) => {
      resp.json().then((json) => {
        // console.log(json);
        const results = json.results
        const leg = {
          // selectedMode: 'single',
          data: [JSON.parse(plant).common_name.th.join(', ')],
        }
        const data = [
          {
            label: { show: true },
            id: 0,
            name: JSON.parse(plant).common_name.th.join(', '),
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
        const categories = [{ name: JSON.parse(plant).common_name.th.join(', ') }]
        setGraphPlantOption(graphTemplateOption(leg, data, links, categories))
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
  const handleGenGraphFromDesease = (value) => {
    // console.log(value)
    handleFetchHealthSystemDesease(value)
  }
  const handleGenGraphFromPlant = (value) => {
    // console.log(value)
    handleFetchPlant(JSON.stringify(value))
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
          {/* <CardDetail title='ที่เกี่ยวข้อง'
          <p className="text-3xl font-bold text-gray-900 dark:text-white pl-4 mb-4 hide">{result.functional_ingredient}</p>

          <CardDetail title='ที่เกี่ยวข้อง'
            desc={
              <ReactEcharts style={{ height: '600px', borderStyle: 'solid' }} option={chartOption} />
            }
          /> */}
          <Tab tabs={[
            {
              name: 'คุณประโยชน์',
              content:
                <div className='lg:flex flex-row lg:divide-x-2'>
                  <div className='flex-1 pb-4'>
                    <div className='flex flex-col gap-4'>
                      <Bagdes list={result.health_system_disease} handleClick={handleGenGraphFromDesease} />
                      <Lists list={result.important_health_benefits} />
                    </div>
                  </div>
                  <div className='flex-1'>
                    <ReactEcharts style={{ borderStyle: 'solid', height: '500px' }} option={graphOption} />
                  </div>
                </div>
            },
            {
              name: 'พืช',
              content:
                <div className='lg:flex flex-row lg:divide-x-2 gap-2'>
                  <div className='flex-1 pb-4'>
                    {/* <Table
                      head={
                        <tr><th className='px-4'>ชื่อ</th><th className='px-4'>ส่วนที่ใช้</th><th className='px-4'>กรรมวิธี</th><th className='px-4'>เงื่อนไข</th></tr>
                      }
                      body={result.plants?.map((plant, index) => (
                        <tr key={index} className='hover:bg-gray-100 text-left'>
                          <td className='px-4 text-std py-1'><button onClick={() => handleGenGraphFromPlant(plant)}>{plant.common_name.th.join(', ')}</button></td>
                          <td className='px-4 text-std py-1'>{plant.part_of_studied}</td>
                          <td className='px-4 text-std py-1'>{plant.process || '-'}</td>
                          {
                            index === 0 && <td rowSpan={result.plants?.length} className='px-4 text-std py-1'>{result.condition || '-'}</td>
                          }
                        </tr>
                      ))}
                    /> */}
                  </div>
                  <div className='flex-1'>
                    <ReactEcharts style={{ borderStyle: 'solid', height: '500px' }} option={graphPlantOption} />
                  </div>
                </div>
            },
            {
              name: 'การรับรอง',
              href: '#five',
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
          <div className='-mb-4'>
            <SmileDrawer smilesStr='OC(C(=O)O[C@H]1C[N+]2(CCCOC3=CC=CC=C3)CCC1CC2)(C1=CC=CS1)C1=CC=CS1' />
            {/* <img src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Gymnemic-acids.svg" alt="" /> */}
          </div>
          <div className='mt-0'>
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
              <Tab tabs={[
                {
                  name: 'รูปส่วนผสมฟังค์ชัน'
                },
                {
                  name: 'ข้อมูลทั่วไป'
                },
                {
                  name: 'คุณประโยชน์'
                },
                {
                  name: 'พืช'
                },
                {
                  name: 'การรับรอง'
                },
                {
                  name: 'แหล่งวัตถุดิบ'
                },
                {
                  name: 'งานวิจัย'
                },
                {
                  name: 'สารออกฤทธิ์ที่ใช้ร่วมกัน'
                }
              ]
              } />

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
                          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Gymnemic-acids.svg" alt="" />
                        </div>
                      },
                      {
                        name: 'รูปความสัมพันธ์',
                        content: <CardDetail desc={<ReactEcharts option={chartOption} />} />
                      },
                      {
                        name: 'รูปส่วนผสมฟังค์ชัน',
                        content: <div className="img-show">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Gymnemic-acids.svg" alt="" />
                        </div>
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
                      <tr>
                        <th>ชื่อ</th>
                        <th>ส่วนที่ใช้</th>
                        <th>กรรมวิธี</th>
                        <th>เงื่อนไข</th>
                      </tr>
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