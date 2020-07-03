import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BsChevronDoubleLeft } from 'react-icons/bs'
import MyDropzone from '../../components/MyDropzone'
import './style.scss'
import './account_style.scss'
import Environments from '../../components/Environments/'
import { User } from '../../services/' 
import Popup from '../../components/Popup/index'
// import profilePicture from '../../assets/erickjohnson.jpg'


export default function Profile() {
  const [id, setId] = useState(0)
  const [image, setImage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [occupation, setOccupation] = useState('')
  const [company, setCompany] = useState('')
  const [currentContent, setCurrentContent] = useState('account')
  const [isPopupShowing, setIsPopupShowing] = useState('')

  useEffect(() => {
    async function loadProfileContent() {
      const response = await User.show()
      setName(response.data.name)
      setEmail(response.data.email)
      setOccupation(response.data.occupation)
      setCompany(response.data.company)
      setId(response.data.id)

      if (response.data.avatar)
        setImageUrl(`${response.data.avatar}`);
    }

    loadProfileContent()
  }, [])

  useEffect(() => {
    if (image !== '')
      handleProfileUpdate({ name, email, occupation, company_name: company, avatar: image })

  }, [image])


  async function handleProfileUpdate(params) {
    const formData = new FormData()
    formData.append('id', id)
    formData.append('name', params.name)
    formData.append('email', params.email)
    formData.append('occupation', params.occupation)
    formData.append('company_name', params.company_name)

    if (image !== '')
      formData.append('avatar', image)

    const response = await User.update(id, formData)

    setName(params.name)
    setEmail(params.email)
    setOccupation(params.occupation)
    setCompany(params.company_name)
  }


  function handleCurrentContent(component, event) {
    if (event.target.id === "") {
      document.getElementById("styled-tabs").id = ""
      event.target.id = "styled-tabs"
      setCurrentContent(component)
    }
  }

  async function handleDeleteAccount() {
    await User.delete()
    setIsPopupShowing('')
    window.location.href = '/'
  }

  async function handleChangePassword(params) {
    const response = await User.changePassword(params)
    if (response.data.status == 'success') {
      setIsPopupShowing('')
      if (response.data.message == 'Redirect to login')
        window.location.href = '/'  
    }
    else
      alert(response.data.message) 
  }

  return (
    <div className="profile">
      <nav>
        <Link to="/"><BsChevronDoubleLeft size={24} style={{ color: "#FFFFFF", cursor: "pointer", marginLeft: "32px"  }}/></Link>
      </nav>
      <div className="profile-picture">
        <MyDropzone imageUrl={imageUrl} onFileUploaded={setImage} />
      </div>
      <div className="profile-container">
        <div className="profile-name-container">
          <h1
            spellCheck={false}
            contentEditable={true} 
            suppressContentEditableWarning={true}
            placeholder="Name"
            onBlur={(event) => handleProfileUpdate({ name: event.target.textContent, email, occupation, company_name: company })}
            onKeyDown={(event) => { if (event.keyCode === 13) event.target.blur() }}
          >{name}</h1>
        </div>
        <div className="profile-options">
          <h2 id="styled-tabs" onClick={(event) => handleCurrentContent('account', event)}>Account</h2>
          <h2 id="" onClick={(event) => handleCurrentContent('environments', event)}>Environments</h2>
        </div>
      </div>
      { currentContent === 'account' &&
        <div className="account-container">
          <div className="account-inner-container">
            <div className="account-content">
              <div className="account-items">
                <p>Email:</p>
                <p>Company name:</p>
                <p>Occupation:</p>
              </div>
              <div className="account-values">
                <p 
                  placeholder="Email"
                  spellCheck={false} 
                  suppressContentEditableWarning={true} 
                  contentEditable={true}
                  onBlur={(event) => handleProfileUpdate({ name, email: event.target.textContent, occupation, company_name: company })}
                  onKeyDown={(event) => { if (event.keyCode === 13) event.target.blur() }}
                  >{email}
                </p>
                <p 
                  placeholder="Company"
                  spellCheck={false} 
                  suppressContentEditableWarning={true} 
                  contentEditable={true}
                  onBlur={(event) => handleProfileUpdate({ name, email, occupation, company_name: event.target.textContent })}
                  onKeyDown={(event) => { if (event.keyCode === 13) event.target.blur() }}
                  >{company}
                </p>
                <p 
                  placeholder="Occupation"
                  spellCheck={false} 
                  suppressContentEditableWarning={true} 
                  contentEditable={true}
                  onBlur={(event) => handleProfileUpdate({ name, email, occupation: event.target.textContent, company_name: company })}
                  onKeyDown={(event) => { if (event.keyCode === 13) event.target.blur() }}
                  >{occupation}
                </p>
              </div>
            </div>
            <a onClick={() => {
              setIsPopupShowing(
                <Popup 
                  title="Change password" 
                  type="change-password" 
                  onConfirm={handleChangePassword} 
                  onCancel={() => setIsPopupShowing('')}
                />
              )}}
              >Change password
            </a>
            <button onClick={() => {
              setIsPopupShowing(
                <Popup 
                  title="Delete account"
                  message="Are you sure? If you delete your account you won’t be able to recover it later and all your data will be deleted!"
                  type="delete-account" 
                  onConfirm={handleDeleteAccount} 
                  onCancel={() => setIsPopupShowing('')}
                />
              )}}
              >Delete account
            </button>
          </div>
        </div>
      }
      { currentContent === 'environments' && 
        <Environments userId={id}/>
      }
      { isPopupShowing }
    </div>
  )
}
