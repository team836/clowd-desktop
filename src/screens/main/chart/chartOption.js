export const optionsRadial = {
  colors: ['#CF93FF'],
  animations: {
    enabled: true,
    easing: 'easeinout',
    speed: 100,
    animateGradually: {
      enabled: true,
      delay: 150
    },
    dynamicAnimation: {
      enabled: true,
      speed: 350
    }
  },
  plotOptions: {
    radialBar: {
      startAngle: 0,
      endAngle: 360,
      background: '#ffffff',
      hollow: {
        margin: 0,
        size: '70%',
        background: '#F3F4F5',
        image: undefined,
        imageOffsetX: 0,
        imageOffsetY: 0,
        position: 'front',
        dropShadow: {
          enabled: false,
          top: 1,
          left: 0,
          blur: 0,
          opacity: 0.2
        }
      },
      track: {
        background: '#fff',
        strokeWidth: '67%',
        margin: 0, // margin is in pixels
        dropShadow: {
          enabled: true,
          top: 0,
          left: 0,
          blur: 1,
          opacity: 0.2
        }
      },
      dataLabels: {
        showOn: 'always',
        name: {
          offsetY: -20,
          show: false,
          color: '#888',
          fontSize: '13px'
        },
        value: {
          offsetY: 10,
          formatter: function(val) {
            return val + '%'
          },
          color: '#111',
          fontSize: '30px',
          show: true
        }
      }
    }
  },
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'horizontal',
      shadeIntensity: 0.5,
      gradientToColors: ['#6C69FF'],
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 100]
    }
  },
  stroke: {
    lineCap: 'round'
  },
  labels: ['Percent']
}
