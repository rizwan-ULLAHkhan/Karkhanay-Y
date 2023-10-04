export const VideoSchema= {
    name: 'video_schema',
    title: 'homepage video', 
    type: 'document',
    fields:[
        {
            name:"Homepagevideo",
            title:"Video Name",
            type:"string"
        },
        {
            name:"Description",
            title:"Video Description",
            type:"string"
        },
        {
            name:"Video",
            type:"file"
        },
    ]

};
