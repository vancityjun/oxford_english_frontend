import * as Device from 'expo-device'

const isDesktop = async () => {
  const device = await Device.getDeviceTypeAsync()
  return device === Device.DeviceType.DESKTOP
}

export default isDesktop