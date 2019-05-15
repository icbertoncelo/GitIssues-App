import { StyleSheet } from 'react-native';
import { metrics, colors } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
  },
  loading: {
    marginTop: metrics.baseMargin,
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: metrics.basePadding,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    height: 44,
    width: metrics.screenWidth - 80,
    paddingHorizontal: metrics.basePadding,
  },
  icon: {
    color: colors.darker,
  },
});

export default styles;
