import React, { useEffect, useState } from 'react'
import CardDetail from '../components/CardDetail'
import Table from '../components/Table'
import InputIcon from '../components/InputIcon'
import { ScrollRestoration, useParams } from 'react-router-dom'
import Tab from '../components/Tab'
import Bagdes from '../components/Bagdes'
import Lists from '../components/Lists'
import IngredientDetail from '../components/IngredientDetail'
import api from '../middleware/api'

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
  
  useEffect(() => {
    // console.log(herbId);
    api.post(`/api/as/v1/engines/ingredients-demo/search`, {
      query: '',
      filters: {
        id: [herbId]
      }
    }, import.meta.env.VITE_ES_SEARCH_KEY).then((resp) => {
      resp.json().then((json) => {
        // console.log((json.results[0]))
        transform(json.results[0])
      })
    })
  }, [])
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
  return (
    <>
    {/* {
      JSON.stringify(result)
    } */}
      {/* <IngredientDetail /> */}
      <div className='flex md:flex-row flex-col gap-2'>
        <div className='md:w-3/4  flex flex-col gap-2 mx-4'>
          <p className="text-3xl font-bold text-gray-900 dark:text-white pl-4 mb-4">{ result.functional_ingredient }</p>
          <CardDetail title='ข้อมูลทั่วไป' desc={result.desc}></CardDetail>
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
                    <td className='px-4 text-std py-1'>{ plant.common_name.th }</td>
                    <td className='px-4 text-std py-1'>{ plant.part_of_studied }</td>
                    <td className='px-4 text-std py-1'>{ plant.process || '-' }</td>
                    {
                      index === 0 && <td rowSpan={result.plants?.length} className='px-4 text-std py-1'>{ result.condition || '-' }</td>
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
          <div className=''>
            <InputIcon />
          </div>
          <div className=''>
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d2/Gymnemic-acids.svg" alt="" />
          </div>
          <div className=''>
            <Table
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
            />
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
    </>
  )
}

export default HerbDetail