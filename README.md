<div align="center">

## 의료이미지 진단 보조 서비스 프로토타입</br>(닥터헬퍼_Doctor Helper)



___
</div>

해당 프로젝트는 (주)씨에스리가 주관한 실용 중심의 인공지능 개발자 양성과정에서 진행한 산학프로젝트로, [프레임워크 모나이(Monai)](https://monai.io/), Yolo v5, kaggle 등의 오픈소스를 활용하여 진행했음을 밝힙니다.
</br></br>

## - 프로젝트 개요
- 약 3개월 간 진행된 산학프로젝트로, 의료 이미지의 1차적인 진단을 통해 의사의 업무를 보조하기 위한 목적으로 기획되었습니다. 
- 흉부 X-ray, 뇌 CT, 피부암 이미지 총 3종류의 이미지에 대한 진단 서비스를 제공합니다.
- 외에도 메모, 북마크, 다국어 등의 부가 기능을 지원합니다.
- Quasar를 이용해 개발한 웹앱으로, 로컬 호스팅을 통한 기능 구현까지만 개발하였습니다.
- MongoDB에 저장된 이미지들에 대해 진단할 수 있도록 개발되었습니다.

## - 기술 스택
* 언어
    - Python 3.8
    - Javascript
* 그 외
    - Node.js
    - Vue.js
    - Quasar
    - Git
    - Flask
    - MongoDB
    - Postman

## - 주요 기능

1. 흉부 X-ray 진단</br>
흉부 X-ray를 14가지 질병에 대해 진단하고, 그 의심 부위를 박스로 표시합니다. 의심되는 모든 질병에 대해 확률과 함께 질병 명을 보여줍니다.
</br></br>
[분류 가능 질병]</br>
"대동맥확장", "무기폐", "석회화", "심장비대", "폐경결", "간질성폐질환", "침윤", "폐불투명도", "결정/덩어리", "기타병변", "흉막삼출", "흉막비후", "기흉", "폐섬유증"
</br></br>

2. 뇌종양 여부 진단</br>
뇌 CT를 보고 뇌종양인지 여부를 판단하고, 뇌종양으로 판단되면 그 의심 부위를 박스로 표시합니다.
</br></br>
[분류 가능 질병]</br>
"뇌종양"
</br></br> 

3. 피부암 진단</br>
피부 이미지를 7가지 종류의 암 중 하나로 진단하고, 그 의심 부위를 박스로 표시합니다.
</br></br>
[분류 가능 질병]</br>
"광선각화증", "기저세포암", "지루각화증", "피부섬유종", "비정형색소모반", "혈관종", "악성흑색종"
</br></br> 




## - 부가 기능
- 진단에 대한 메모를 기록하고 DB에 저장할 수 있습니다.
- 이미지를 북마크해 북마크 페이지에서 모아볼 수 있습니다.
- 영어, 일본어, 에스페란토어의 다국어를 지원합니다.
- 테마 색상을 지정할 수 있습니다.

## - Backend

1) Flask (API server)
Flask를 이용해 질병 진단을 위한 3개의 API 서버를 구축했습니다. 각 서버는 기능에 맞는 진단을 위한 모델을 내부적으로 포함하고 있으며, Frontend에서 전달된 요청에 따른 진단 결과를 output으로 제공합니다. 관련된 코드는 server_flask 폴더를 참고하시기 바랍니다.
</br></br>

* 흉부 X-ray
    - Yolo.v5를 사용했습니다.
    - ./server_flask/chest-api/webapp.py를 실행해 서버를 열 수 있습니다.
    - 이미지와(file) 파일명(fileName)을 input으로 받아, 진단된 이미지와 진단명, 의심되는 질병의 확률을 output으로 내보냅니다.

* 뇌 CT
    - 프레임워크 Monai를 사용했습니다. 
    - ./server_flask/brain_tumor-api/api_v01.py를 실행해 서버를 열 수 있습니다.
    - 이미지와(file) 파일명(fileName)을 input으로 받아, 진단된 이미지와 진단명, 원본 이미지를 output으로 내보냅니다. (뇌종양이 아닌 것으로 판단된다면 진단된 이미지는 없습니다.)

* 피부 이미지
    - Densenet121을 사용했습니다. 
    - ./server_flask/brain_tumor-api/api_v10.py를 실행해 서버를 열 수 있습니다.
    - 이미지와(file) 파일명(fileName)을 input으로 받아, 진단된 이미지와 진단명, 원본 이미지를 output으로 내보냅니다.


2) MongoDB </br>
환자 정보를 저장하고 불러와 사용하기 위해 NoSQL DB인 MongoDB를 사용했습니다. Frontend에서의 요청에 따라 필요한 데이터들을 저장하고 불러옵니다. 관련된 코드는 server 폴더에 있으며, 환경 구축은 [여기](https://mingchin.tistory.com/111)를 참고하시기 바랍니다.

    - ./server에서 node.js prompt 명령어(`$npm start`)를 통해 서버를 열 수 있습니다.
    - 이미지, 환자 정보, 진단 여부, 메모, 북마크 여부 등을 저장합니다.
    - 특정 이미지에 대해 진단을 실시한 경우, 그 진단한 결과 역시 DB에 저장됩니다.

## - Frontend

프레임워크 Quasar를 통해 개발하였습니다. 총 11개의 페이지로 구성되어 있습니다. 관련된 코드는 quasar_app 폴더에 있으며, Quasar 활용을 위한 환경 구축은 [여기](https://mingchin.tistory.com/103)를 참고하시기 바랍니다.

- ./quasar_app에서 node.js prompt 명령어(`$quasar dev`)를 통해 서버를 열 수 있습니다.
</br></br>

## - 기능 흐름도
![기능 흐름도](https://user-images.githubusercontent.com/85151359/148364644-fe40655a-1633-4483-bf9b-a5c64f468912.PNG)


## - Frontend 화면/앱 사용 예시

- https://youtu.be/9V1ag5AmZTE

## - References
- 프레임워크 Monai: https://monai.io/
- 뇌종양 데이터 & 모델: 
    - https://www.kaggle.com/ahmedhamada0/brain-tumor-detection?select=pred
    - https://www.kaggle.com/navoneel/brain-mri-images-for-brain-tumor-detection
- Yolo v5 모델: https://www.kaggle.com/awsaf49/vinbigdata-cxr-ad-yolov5-14-class-train/notebook
- 피부암 데이터: https://www.kaggle.com/kmader/skin-cancer-mnist-ham10000
- 피부암 진단 모델: https://www.kaggle.com/xinruizhuang/skin-lesion-classification-acc-90-pytorch
- Quasar: https://quasar.dev/



