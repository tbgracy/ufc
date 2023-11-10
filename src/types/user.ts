export type User = {
    id?: string,
    name: string,
    profilePictureUrl: string, // the profile picture url
    authProvider: 'google' | 'github',
}