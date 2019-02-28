import React from 'react';
const Footer = () => {
  return (<>
    <footer className='page-footer font-small pt-4' style={{ backgroundColor: '#232435' }}  >
      <div className='container-fluid text-center text-md-left'>
        <div className='row'>
          <div className='col-lg-5 col-xs-12 mt-md-0 mt-3' style={{color: '#ffffff'}}>
            <h5 className='text-uppercase'>BingeWatch</h5>
            <p>Team Project to create React App utilizing YouTube API for search. Mimic Youtube features to display content such as Home/Feed view, Search feature, Video Page and additional extra features.</p>
          </div>
          <div className='col-lg-5'></div>
          <hr className='clearfix w-100 d-md-none pb-3' />
          <div className='col-lg-2 col-xs-12 mb-md-0 mb-3'>
            <h5 className='text-uppercase' style={{ textDecoration: 'none', color: '#ffffff' }}>Links</h5>
            <ul className='list-unstyled'>
              <li>
                <a href='#!' style={{ textDecoration: 'none', color: '#ffffff' }}>Home</a>
              </li>
              <li>
                <a href='#!' style={{ textDecoration: 'none', color: '#ffffff' }}>Editor</a>
              </li>
              <li>
                <a href='https://github.com/Knkjett/OurTube/blob/master/README.md' style={{ textDecoration: 'none', color: '#ffffff' }}>About Us</a>
              </li>
              <li>
                <a href='https://github.com/Knkjett/OurTube' style={{ textDecoration: 'none', color: '#ffffff' }}>GitHub</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright text-center py-3" style={{ backgroundColor: '#1c1d2a', color: '#ffffff' }}>
        <br />
        <br />
        BingeWatch
        <br />
        <br />
        <br />
      </div>
    </footer>
  </>)
}


export default Footer;