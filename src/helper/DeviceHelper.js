import * as Device from 'expo-device'

export let deviceType, isDesktop

const initialize = async () => {
  const device = await Device.getDeviceTypeAsync()
  deviceType = Device.DeviceType[device]
  isDesktop = deviceType === 'DESKTOP'
}

export default initialize