import React from 'react'
import herbLogo from '@/assets/FoodInno-Logo1.png'
import { Link } from 'react-router-dom'


function Footer() {
  return (
    // <div className='bg-gray-100 w-full flex flex-col gap-4 justify-center pt-8 pb-4'>
    //   <div className='flex flex-col gap-8'>
    //     <div className='flex justify-center'>
    //       <div className='flex flex-row w-3/4'>
    //         <div className='flex flex-1 flex-col gap-6'>
    //           <p className='font-bold'>Quick Links</p>
    //           <Link to='/' className='font-semibold text-std text-gray-700'>Home</Link>
    //           <Link to='/' className='font-semibold text-std text-gray-700'>Services</Link>
    //           <Link to='/' className='font-semibold text-std text-gray-700'>FAQ</Link>
    //         </div>
    //         <div className='flex flex-1 flex-col gap-6'>
    //           <p className='font-bold'>About Us</p>
    //           <Link to='/' className='font-semibold text-std text-gray-700'>Mission</Link>
    //           <Link to='/' className='font-semibold text-std text-gray-700'>Contact</Link>
    //         </div>
    //         <div className='w-2/4 flex flex-col gap-4'>
    //           <img className='object-left-top object-contain h-10' src={herbLogo} alt="" />
    //           <p className='text-xl font-bold'>Innovation manager (IM) of Functional ingredient and Food</p>
    //           <p className='text-std'>ฝ่ายยุทธศาสตร์และติดตามประเมินผล (SME) สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ (สวทช.) 111 อุทยานวิทยาศาสตร์ประเทศไทย ถนนพหลโยธิน ตำบลคลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี 12120 โทร. 02-564-7000 ต่อ 1471</p>
    //         </div>
    //       </div>
    //     </div>
    //     <div className='flex justify-center'>
    //       <p className='text-std'>© {new Date().getFullYear()} Innovation manager (IM) of Functional ingredient and Food . All Rights Reserved.</p>
    //     </div>
    //   </div>
    // </div>
    <div className="footer-container">
      <div className='footer-menu'>
        <Link to='/' className=''>Home</Link>
        <Link to='/' className=''>Services</Link>
        <Link to='/' className=''>FAQ</Link>
        <Link to='/' className=''>About us</Link>
        <Link to='/' className=''>Mission</Link>
        <Link to='/' className=''>Contact</Link>
      </div>
      <div className='contact-detail'>
        <img src={herbLogo} alt="" />
        <div className='info'>
          <p>ฝ่ายยุทธศาสตร์และติดตามประเมินผล (SME) สำนักงานพัฒนาวิทยาศาสตร์และเทคโนโลยีแห่งชาติ (สวทช.)</p>
          <p>111 อุทยานวิทยาศาสตร์ประเทศไทย ถนนพหลโยธิน</p>
          <p>ตำบลคลองหนึ่ง อำเภอคลองหลวง จังหวัดปทุมธานี 12120</p>
          <p>โทร. 02-564-7000 ต่อ 1471</p>
        </div>
        <div className="social-icon">
          <a href="https://www.facebook.com/foodinnopolis" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className='fb-icon'><path d="m437 0h-362c-41.351562 0-75 33.648438-75 75v362c0 41.351562 33.648438 75 75 75h151v-181h-60v-90h60v-61c0-49.628906 40.371094-90 90-90h91v90h-91v61h91l-15 90h-76v181h121c41.351562 0 75-33.648438 75-75v-362c0-41.351562-33.648438-75-75-75zm0 0"/></svg></a>
          <a href="https://www.youtube.com/@-fichannel1140" target="_blank" rel="noopener noreferrer">
            <svg height="682pt" viewBox="-21 -117 682.66672 682" width="682pt" xmlns="http://www.w3.org/2000/svg"><path d="m626.8125 64.035156c-7.375-27.417968-28.992188-49.03125-56.40625-56.414062-50.082031-13.703125-250.414062-13.703125-250.414062-13.703125s-200.324219 0-250.40625 13.183593c-26.886719 7.375-49.03125 29.519532-56.40625 56.933594-13.179688 50.078125-13.179688 153.933594-13.179688 153.933594s0 104.378906 13.179688 153.933594c7.382812 27.414062 28.992187 49.027344 56.410156 56.410156 50.605468 13.707031 250.410156 13.707031 250.410156 13.707031s200.324219 0 250.40625-13.183593c27.417969-7.378907 49.03125-28.992188 56.414062-56.40625 13.175782-50.082032 13.175782-153.933594 13.175782-153.933594s.527344-104.382813-13.183594-154.460938zm-370.601562 249.878906v-191.890624l166.585937 95.945312zm0 0"/></svg></a>
        </div>
      </div>
      <div className='text-std-year'>© {new Date().getFullYear()} Innovation manager (IM) of Functional ingredient and Food . All Rights Reserved.
      </div>
    </div>
  )
}

export default Footer