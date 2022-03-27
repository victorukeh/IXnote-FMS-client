const RegisterHeader = () => {
  return (
    <>
      <div
        className='header pb-8 pt-5 pt-lg-8 d-flex align-items-center'
        style={styles}
      >
        {/* Mask */}
        <span className='mask bg-gradient-default opacity-8' />
      </div>
    </>
  )
}

export default RegisterHeader


const styles= {
  minHeight: '250px',
  backgroundImage:
    'url(' +
    require('../../assets/img/theme/profile-cover.jpg').default +
    ')',
  backgroundSize: 'cover',
  backgroundPosition: 'center top',
}