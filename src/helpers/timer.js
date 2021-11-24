export const calculatePreTimeLeft = () => {
  const presaleDate = new Date(Date.UTC(2021, 10, 18, 0, 0, 0))
  const difference = presaleDate - new Date()

  let timeLeft = {}

  if (difference > 0) {
    timeLeft = {
      days:
        Math.floor(difference / (1000 * 60 * 60 * 24)) < 10
          ? `0${Math.floor(difference / (1000 * 60 * 60 * 24))}`
          : `${Math.floor(difference / (1000 * 60 * 60 * 24))}`,
      hours:
        Math.floor((difference / (1000 * 60 * 60)) % 24) < 10
          ? `0${Math.floor((difference / (1000 * 60 * 60)) % 24)}`
          : `${Math.floor((difference / (1000 * 60 * 60)) % 24)}`,
      minutes:
        Math.floor((difference / 1000 / 60) % 60) < 10
          ? `0${Math.floor((difference / 1000 / 60) % 60)}`
          : `${Math.floor((difference / 1000 / 60) % 60)}`,
      seconds:
        Math.floor((difference / 1000) % 60) < 10
          ? `0${Math.floor((difference / 1000) % 60)}`
          : `${Math.floor((difference / 1000) % 60)}`,
    }
  }

  return timeLeft
}

export const calculatePublicTimeLeft = () => {
  const publicsaleDate = new Date(Date.UTC(2021, 10, 19, 0, 0, 0))
  const difference = publicsaleDate - new Date()

  let timeLeft = {}

  if (difference > 0) {
    timeLeft = {
      days:
        Math.floor(difference / (1000 * 60 * 60 * 24)) < 10
          ? `0${Math.floor(difference / (1000 * 60 * 60 * 24))}`
          : `${Math.floor(difference / (1000 * 60 * 60 * 24))}`,
      hours:
        Math.floor((difference / (1000 * 60 * 60)) % 24) < 10
          ? `0${Math.floor((difference / (1000 * 60 * 60)) % 24)}`
          : `${Math.floor((difference / (1000 * 60 * 60)) % 24)}`,
      minutes:
        Math.floor((difference / 1000 / 60) % 60) < 10
          ? `0${Math.floor((difference / 1000 / 60) % 60)}`
          : `${Math.floor((difference / 1000 / 60) % 60)}`,
      seconds:
        Math.floor((difference / 1000) % 60) < 10
          ? `0${Math.floor((difference / 1000) % 60)}`
          : `${Math.floor((difference / 1000) % 60)}`,
    }
  }

  return timeLeft
}

export const calculateTimeLeft = (difference) => {
  let timeLeft = {}
  if (difference > 0) {
    timeLeft = {
      hours:
        Math.floor((difference / ( 60 * 60)) % 60) < 10
          ? `0${Math.floor((difference / ( 60 * 60)) % 60)}`
          : `${Math.floor((difference / ( 60 * 60)) % 60)}`,
      minutes:
        Math.floor((difference  / 60) % 60) < 10
          ? `0${Math.floor((difference  / 60) % 60)}`
          : `${Math.floor((difference  / 60) % 60)}`,
      seconds:
        Math.floor((difference ) % 60) < 10
          ? `0${Math.floor((difference ) % 60)}`
          : `${Math.floor((difference ) % 60)}`,
    }
  }

  return timeLeft
}
