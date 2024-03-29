import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';


// import required modules
import { FreeMode, Pagination } from 'swiper/modules';

import { Link, useNavigate } from 'react-router-dom';
import { Facet, Result, Results, SearchBox, SearchProvider, WithSearch } from '@elastic/react-search-ui'
import SmileDrawer from '../components/SmileDrawer'

export default function App() {
  return (
    <>
      <Results
          resultView={({ result }) => {
            if (result.id?.raw) {
              result = Object.assign({}, result, {
                plants: {
                  raw: result.plants.raw.map((plant) => JSON.parse(plant))
                }
              })
            }
            return (
              
              <Swiper
                spaceBetween={14}
                freeMode={true}
                pagination={{
                  clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                breakpoints={{ 0: { slidesPerView:2 }, 440: { slidesPerView:3 }, 600: { slidesPerView: 4 }, 1000: { slidesPerView: 4 }, 1300: { slidesPerView: 5 }, 1600: { slidesPerView: 6 } }}
                className="mySwiper"
                >
                  <SwiperSlide>
                    <div className="swiper-card">
                      <span className="title">{result.functional_ingredient?.raw}</span>
                      {
                        result.chem_formula?.raw ? 
                        <SmileDrawer key={result.id?.raw} smilesStr={result.chem_formula?.raw} uniqueKey={result.id?.raw} /> :
                        <div className="no-image"><img src="src/assets/No-image.svg" alt="" /></div>
                       }
                      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex asperiores soluta voluptates exercitationem facilis, repellat impedit labore repellendus sint fugit corporis mollitia architecto, quas corrupti. Magnam iste alias reiciendis quis libero expedita ipsam modi exercitationem sint fugiat molestiae enim tenetur corrupti similique vel laboriosam, molestias eum veritatis labore quae. Sint?</p>
                      <div className="icon"><i className='fa-solid fa-magnifying-glass'></i></div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              
            )
          }}
          />


      <Swiper
        spaceBetween={14}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        breakpoints={{ 0: { slidesPerView:2 }, 440: { slidesPerView:3 }, 600: { slidesPerView: 4 }, 1000: { slidesPerView: 4 }, 1300: { slidesPerView: 5 }, 1600: { slidesPerView: 6 } }}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="swiper-card">
            <span className="title">Title</span>
            <div className="no-image"><img src="src/assets/No-image.svg" alt="" /></div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex asperiores soluta voluptates exercitationem facilis, repellat impedit labore repellendus sint fugit corporis mollitia architecto, quas corrupti. Magnam iste alias reiciendis quis libero expedita ipsam modi exercitationem sint fugiat molestiae enim tenetur corrupti similique vel laboriosam, molestias eum veritatis labore quae. Sint?</p>
            <div className="icon"><i className='fa-solid fa-magnifying-glass'></i></div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="swiper-card">
            <span className="title">Title</span>
            <div className="no-image"><img src="src/assets/No-image.svg" alt="" /></div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex asperiores soluta voluptates exercitationem facilis, repellat impedit labore repellendus sint fugit corporis mollitia architecto, quas corrupti. Magnam iste alias reiciendis quis libero expedita ipsam modi exercitationem sint fugiat molestiae enim tenetur corrupti similique vel laboriosam, molestias eum veritatis labore quae. Sint?</p>
            <div className="icon"><i className='fa-solid fa-magnifying-glass'></i></div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="swiper-card">
            <span className="title">Title</span>
            <div className="no-image"><img src="src/assets/No-image.svg" alt="" /></div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex asperiores soluta voluptates exercitationem facilis, repellat impedit labore repellendus sint fugit corporis mollitia architecto, quas corrupti. Magnam iste alias reiciendis quis libero expedita ipsam modi exercitationem sint fugiat molestiae enim tenetur corrupti similique vel laboriosam, molestias eum veritatis labore quae. Sint?</p>
            <div className="icon"><i className='fa-solid fa-magnifying-glass'></i></div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="swiper-card">
            <span className="title">Title</span>
            <div className="no-image"><img src="src/assets/No-image.svg" alt="" /></div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex asperiores soluta voluptates exercitationem facilis, repellat impedit labore repellendus sint fugit corporis mollitia architecto, quas corrupti. Magnam iste alias reiciendis quis libero expedita ipsam modi exercitationem sint fugiat molestiae enim tenetur corrupti similique vel laboriosam, molestias eum veritatis labore quae. Sint?</p>
            <div className="icon"><i className='fa-solid fa-magnifying-glass'></i></div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="swiper-card">
            <span className="title">Title</span>
            <div className="no-image"><img src="src/assets/No-image.svg" alt="" /></div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex asperiores soluta voluptates exercitationem facilis, repellat impedit labore repellendus sint fugit corporis mollitia architecto, quas corrupti. Magnam iste alias reiciendis quis libero expedita ipsam modi exercitationem sint fugiat molestiae enim tenetur corrupti similique vel laboriosam, molestias eum veritatis labore quae. Sint?</p>
            <div className="icon"><i className='fa-solid fa-magnifying-glass'></i></div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="swiper-card">
            <span className="title">Title</span>
            <div className="no-image"><img src="src/assets/No-image.svg" alt="" /></div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex asperiores soluta voluptates exercitationem facilis, repellat impedit labore repellendus sint fugit corporis mollitia architecto, quas corrupti. Magnam iste alias reiciendis quis libero expedita ipsam modi exercitationem sint fugiat molestiae enim tenetur corrupti similique vel laboriosam, molestias eum veritatis labore quae. Sint?</p>
            <div className="icon"><i className='fa-solid fa-magnifying-glass'></i></div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="swiper-card">
            <span className="title">Title</span>
            <div className="no-image"><img src="src/assets/No-image.svg" alt="" /></div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex asperiores soluta voluptates exercitationem facilis, repellat impedit labore repellendus sint fugit corporis mollitia architecto, quas corrupti. Magnam iste alias reiciendis quis libero expedita ipsam modi exercitationem sint fugiat molestiae enim tenetur corrupti similique vel laboriosam, molestias eum veritatis labore quae. Sint?</p>
            <div className="icon"><i className='fa-solid fa-magnifying-glass'></i></div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}


