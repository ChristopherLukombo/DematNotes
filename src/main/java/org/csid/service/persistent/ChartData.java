package org.csid.service.persistent;

import java.util.List;

public class ChartData {
	private List<Double> data;
	private String label;

	/**
	 *
	 */
	public ChartData() {
		super();
	}

	/**
	 * @param data
	 * @param label
	 */
	public ChartData(final List<Double> data, final String label) {
		super();
		this.data = data;
		this.label = label;
	}

	/**
	 * @return the data
	 */
	public List<Double> getData() {
		return data;
	}

	/**
	 * @param data the data to set
	 */
	public void setData(final List<Double> data) {
		this.data = data;
	}

	/**
	 * @return the label
	 */
	public String getLabel() {
		return label;
	}

	/**
	 * @param label the label to set
	 */
	public void setLabel(final String label) {
		this.label = label;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#hashCode()
	 */

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((data == null) ? 0 : data.hashCode());
		result = prime * result + ((label == null) ? 0 : label.hashCode());
		return result;
	}

	/* (non-Javadoc)
	 * @see java.lang.Object#equals(java.lang.Object)
	 */
	@Override
	public boolean equals(final Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ChartData other = (ChartData) obj;
		if (data == null) {
			if (other.data != null)
				return false;
		} else if (!data.equals(other.data))
			return false;
		if (label == null) {
            return other.label == null;
		} else return label.equals(other.label);
    }

}
