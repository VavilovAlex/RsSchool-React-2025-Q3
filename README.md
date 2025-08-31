# Performance Profiling

## Before Optimization

### Initial Render Performance

- **Commit time**: 1.4s
- **Render time**: 61.5ms
  ![img_1.png](readme_img/img_1.png)

### Sorting Performance (Population Column)

- **Commit time**: 1.0s
- **Render duration**: 67ms
- **Trigger**: User clicking column header
  ![img_2.png](readme_img/img_2.png)
  ![img_3.png](readme_img/img_3.png)

### Country Details Performance

- **Commit time**: 1.2s
- **Render duration**: 93ms
- **Trigger**: User clicking row
  ![img_5.png](readme_img/img_5.png)
  ![img_4.png](readme_img/img_4.png)

### Filtering Performance (Region Filter)

- **Commit time**: 1.3s
- **Render duration**: 24.2ms
- **Trigger**: Changing region filter
  ![img_6.png](readme_img/img_6.png)
  ![img_7.png](readme_img/img_7.png)

### Year Filter Performance

- **Commit time**: 1.0s
- **Render duration**: 56.3ms
- **Trigger**: Changing year filter
  ![img_9.png](readme_img/img_9.png)
  ![img_8.png](readme_img/img_8.png)

### Country Search Performance

- **Commit time**: 1.4s
- **Render duration**: 30.7ms
- **Trigger**: New input in search field
  ![img_10.png](readme_img/img_10.png)
  ![img_11.png](readme_img/img_11.png)

---

## After Optimization
