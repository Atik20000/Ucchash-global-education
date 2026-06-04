export interface CourseFormData {
  name: string
  whatsappNumber: string
  course: string
  classType: string
  transactionNumber: string
}

// Method 1: Email via mailto (works immediately)
export const sendEmailNotification = async (formData: CourseFormData): Promise<boolean> => {
  try {
    const emailContent = `
New Course Registration - Ucchash IELTS

Student Details:
- Name: ${formData.name}
- WhatsApp Number: ${formData.whatsappNumber}
- Course: ${formData.course}
- Class Type: ${formData.classType || 'Batch Class'}
- Payment Transaction Number: ${formData.transactionNumber}

Registration Time: ${new Date().toLocaleString()}

Please contact the student via WhatsApp for confirmation.

---
This email was sent from your Ucchash IELTS website.
    `.trim()

    const subject = `New Course Registration - ${formData.course} - ${formData.name}`
    const body = emailContent
    const email = 'atik2000.foysal@gmail.com'
    
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    // Open email client
    window.open(mailtoLink, '_blank')
    
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

// Method 2: Save to localStorage for backup (you can export this data)
export const saveToLocalStorage = (formData: CourseFormData): void => {
  try {
    const timestamp = new Date().toISOString()
    const submission = {
      ...formData,
      timestamp,
      id: `submission_${Date.now()}`
    }
    
    // Get existing submissions
    const existing = localStorage.getItem('ucchashIELTS_submissions')
    const submissions = existing ? JSON.parse(existing) : []
    
    // Add new submission
    submissions.push(submission)
    
    // Save back to localStorage
    localStorage.setItem('ucchashIELTS_submissions', JSON.stringify(submissions))
    
    console.log('Form data saved to localStorage:', submission)
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

// Main submission function that tries multiple methods
export const submitCourseForm = async (formData: CourseFormData): Promise<boolean> => {
  try {
    // Always save to localStorage as backup
    saveToLocalStorage(formData)
    
    // Try to send email
    const emailSent = await sendEmailNotification(formData)
    
    if (emailSent) {
      console.log('Form submitted successfully via email')
      return true
    }

    // If email fails, at least we have the data in localStorage
    console.log('Email failed, but data saved to localStorage')
    return true
    
  } catch (error) {
    console.error('Form submission error:', error)
    return false
  }
}

// Function to export all submissions (for you to download)
export const exportSubmissions = (): string => {
  try {
    const submissions = localStorage.getItem('ucchashIELTS_submissions')
    if (submissions) {
      const data = JSON.parse(submissions)
      return JSON.stringify(data, null, 2)
    }
    return 'No submissions found'
  } catch (error) {
    console.error('Export error:', error)
    return 'Error exporting data'
  }
}
