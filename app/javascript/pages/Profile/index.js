import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BsChevronDoubleLeft } from 'react-icons/bs'
import MyDropzone from '../../components/MyDropzone'
import './style.scss'
import './account_style.scss'
import Environments from '../../components/Environments/'
import { User } from '../../services/' 
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

  useEffect(() => {
    async function loadProfileContent() {
      const response = await User.show()
      setName(response.data.name)
      setEmail(response.data.email)
      setOccupation(response.data.occupation)
      setCompany(response.data.company)
      setId(response.data.id)

      if (response.data.avatar)
        setImageUrl(`http://localhost:3000${response.data.avatar}`);
      console.log(response.data.id)
    }

    loadProfileContent()
  }, [])

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

    if (response.data.status === 'success')
      alert('funcionou!')
    else
      alert('deu errado!!!')

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
                  spellCheck={false} 
                  suppressContentEditableWarning={true} 
                  contentEditable={true}
                  onBlur={(event) => handleProfileUpdate({ name, email: event.target.textContent, occupation, company_name: company })}
                  onKeyDown={(event) => { if (event.keyCode === 13) event.target.blur() }}
                  >{email}
                </p>
                <p 
                  spellCheck={false} 
                  suppressContentEditableWarning={true} 
                  contentEditable={true}
                  onBlur={(event) => handleProfileUpdate({ name, email, occupation, company_name: event.target.textContent })}
                  onKeyDown={(event) => { if (event.keyCode === 13) event.target.blur() }}
                  >{company}
                </p>
                <p 
                  spellCheck={false} 
                  suppressContentEditableWarning={true} 
                  contentEditable={true}
                  onBlur={(event) => handleProfileUpdate({ name, email, occupation: event.target.textContent, company_name: company })}
                  onKeyDown={(event) => { if (event.keyCode === 13) event.target.blur() }}
                  >{occupation}
                </p>
              </div>
            </div>
            <a href="#">Change password</a>
            <button>Delete account</button>
          </div>
        </div>
      }
      { currentContent === 'environments' && 
        <Environments/>
      }
    </div>
  )
}
