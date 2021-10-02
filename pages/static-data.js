const keywords = [
    "HTML5/CSS",
    "Javascript",
    "TypeScript",
    "Golang",
    "Ada",
    "Python",
    "Java",
    "C/C++",
    "ReactJS",
    "Java RMI",
    "CORBA",
    "TensorFlow",
    "Keras",
    "Sklearn",
    "NLTK",
    "Matplotlib",
    "MongoDB",
    "SQL",
    "GraphQL",
    "Arduino",
    "FPGA",
    "Raspberry Pi",
];

const curric = [
    {
        university: "University of Paris-Descartes",
        location: "Paris, France",
        date: "2021 - current",
        title: "Vision and intelligent machines",
    },
    {
        university: "University of Western Brittany",
        location: "Brest, France",
        date: "2020 - 2021",
        title: "Intelligent, interactive and autonomous systems",
    },
    {
        university: "University of science and technology Houari Boumediene",
        location: "Algiers, Algeria",
        date: "2017 - 2019",
        title: "Information systems and software engineering bachelor",
    },
];

const projects = [
    {
        title: "CRNN for licence plates OCR",
        description: "Characters recognition from license plates using convolutional recurrent neural networks.",
        tags: ["Python", "Keras", "Numpy", "CRNN"],
        thumbnail: "https://cdn.discordapp.com/attachments/874390691931902022/878748098879434782/ocr.png",
        link: "https://github.com/Arksyd96/ocr-license-plates-crnn/blob/master/text-from-image-ocr.ipynb"
    },
    {
        title: "Aerial-to-topographic image translation (CGAN)",
        description: "Implementation of a pix2pix model that translates aerial images to topographic maps.",
        tags: ["Tensorflow", "Numpy", "GAN", "Image translation"],
        thumbnail: "https://cdn.discordapp.com/attachments/874390691931902022/876508094723657748/pix2pix.png",
        link: "https://github.com/Arksyd96/aerial-to-topographic-pix2pix"
    },
    {
        title: "Neural network from scratch",
        description: "Implementation of two hidden layers neural network from scratch using Numpy only.",
        tags: ["Python", "Numpy"],
        thumbnail: "https://cdn.discordapp.com/attachments/874390691931902022/878762305389756466/nn.jpg",
        link: "https://github.com/Arksyd96/anomaly-detection-autoencoder/blob/master/Anomaly-detection.ipynb"
    },
    {
        title: "Selective search algorithme",
        description: "Region proposal algorithm used for object detection, based on computing groupings color, texture, size, and shape similarities.",
        tags: ["Object detection", "Numpy"],
        thumbnail: "https://cdn.discordapp.com/attachments/874390691931902022/878937561098240070/ssa.jpg",
        link: "https://colab.research.google.com/drive/1TXAlsIeNYknt2GZ99i6KcV0PH9r-nvBw?usp=sharing"
    },
    {
        title: "English to French text translator using LSTMs",
        description: "Implementation of a sequence-to-sequence LSTM model for text translation using Keras (Word-based model).",
        tags: ["Python", "Keras", "LSTM"],
        thumbnail: "https://cdn.discordapp.com/attachments/874390691931902022/879670793569722438/text_translator.jpg",
        link: "https://github.com/Arksyd96/text-translation-with-lstm"
    },
    {
        title: "MNIST Anomaly detection using Tensorflow and Keras",
        description: "Implementation of an Autoencoder for the detection of anomalies and outliers in a dataset.",
        tags: ["Computer vision", "Keras", "Autoencoders"],
        thumbnail: "https://cdn.discordapp.com/attachments/874390691931902022/880370589913718784/ANOMALY.jpg",
        link: "#"
    },
    {
        title: "Content based image retrieval with Keras",
        description: "Autoencoder implementation of content-based image retrieval. They are used by search engines to retrieve similar images.",
        tags: ["Python", "Keras", "Autoencoders"],
        thumbnail: "https://cdn.discordapp.com/attachments/874390691931902022/879675303956475904/image-retrieval.png",
        link: "https://github.com/Arksyd96/content-based-image-retrieval-keras/blob/master/content-based-image-retrieval-autoencoders.ipynb"
    },
    {
        title: "Denoising autoencoder with Keras",
        description: "Implementation of a DAE. Removes noise from an image by shrinking it into latent space and reconstructing it.",
        tags: ["Python", "Keras", "Autoencoders"],
        thumbnail: "https://cdn.discordapp.com/attachments/874390691931902022/883275309917556756/dae.png",
        link: "https://github.com/Arksyd96/denoising-autoencoder-keras/blob/master/Denoising-autoencoder-keras.ipynb"
    },
    {
        title: "Implementation of a perceptron for logistic regression",
        description: "Binary image classification using a single neuron model (Perceptron).",
        tags: ["Python", "Numpy"],
        thumbnail: "https://cdn.discordapp.com/attachments/874390691931902022/889117242674008084/Perceptron.jpg",
        link: "https://nbviewer.jupyter.org/github/Arksyd96/perceptron_implementation_for_logistic_regression/blob/master/perceptron_implementation_for_logistic_regression.ipynb"
    }
    
]

const geStaticData = (index) => {
    if(index === 0) return keywords;
    else if(index === 1) return curric;
    else if(index === 2) return projects;
}

export default geStaticData;