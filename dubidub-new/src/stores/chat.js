import { defineStore } from 'pinia'
import SendBird from 'sendbird'

const APP_ID = '670A870F-ECBA-434B-AECF-3A0B2F0444CD'
const sb = new SendBird({ appId: APP_ID })

export const useChatStore = defineStore('chat', {
  state: () => ({
    channels: [],
    currentChannel: null,
    messages: [],
    isConnected: false
  }),
  
  actions: {
    connect(userId) {
      return new Promise((resolve, reject) => {
        sb.connect(userId, (user, error) => {
          if (error) {
            this.isConnected = false
            reject(error)
          } else {
            this.isConnected = true
            resolve(user)
          }
        })
      })
    },

    loadChannels() {
      const query = sb.GroupChannel.createMyGroupChannelListQuery()
      query.limit = 20
      query.includeEmpty = true
      
      return new Promise((resolve, reject) => {
        query.next((channels, error) => {
          if (error) {
            reject(error)
          } else {
            this.channels = channels
            resolve(channels)
          }
        })
      })
    },

    createChannel(name, userIds) {
      const params = new sb.GroupChannelParams()
      params.isPublic = false
      params.isDistinct = false
      params.addUserIds(userIds)
      params.name = name

      return new Promise((resolve, reject) => {
        sb.GroupChannel.createChannel(params, (channel, error) => {
          if (error) {
            reject(error)
          } else {
            this.channels.push(channel)
            resolve(channel)
          }
        })
      })
    },

    enterChannel(channelUrl) {
      return new Promise((resolve, reject) => {
        sb.GroupChannel.getChannel(channelUrl, (channel, error) => {
          if (error) {
            reject(error)
          } else {
            this.currentChannel = channel
            this.loadMessages(channel)
            resolve(channel)
          }
        })
      })
    },

    loadMessages(channel) {
      channel.getMessagesByTimestamp(
        Date.now(),
        false,
        50,
        'latest',
        '',
        (messages, error) => {
          if (!error) {
            this.messages = messages
          }
        }
      )
    },

    sendMessage(message) {
      if (!this.currentChannel || !message.trim()) return

      return new Promise((resolve, reject) => {
        this.currentChannel.sendUserMessage(message, (msg, error) => {
          if (error) {
            reject(error)
          } else {
            this.messages.push(msg)
            resolve(msg)
          }
        })
      })
    }
  }
}) 